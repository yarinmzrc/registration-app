import { act, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { describe, expect, it } from "vitest";
import {
  ATTRIBUTION_STORAGE_KEY,
  readAttribution,
} from "@/features/attribution";
import type { RegisterPayload } from "@/features/registration";
import { server } from "@/mocks/server";
import { renderApp } from "@/test/render-app";

const LANDING = "/?promo=SAVE10&utm_source=fb&utm_campaign=spring";

function signIn() {
  localStorage.setItem(
    "auth:session",
    JSON.stringify({ user: { id: "u1", email: "a@b.co" }, token: "t" }),
  );
}

async function fillAndSubmit(email = "ada@example.com") {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Name"), "Ada");
  await user.type(screen.getByLabelText("Email"), email);
  await user.type(screen.getByLabelText("Password"), "correct-horse");
  await user.click(screen.getByRole("button", { name: "Create account" }));
}

describe("guest landing with modal + attribution params", () => {
  it("captures attribution, then redirects to /register without showing a modal", () => {
    const app = renderApp(LANDING);

    expect(app.url()).toBe(`/register?returnTo=${encodeURIComponent(LANDING)}`);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(readAttribution()?.params).toEqual({
      utm_source: "fb",
      utm_campaign: "spring",
    });
  });

  it("sends attribution with the registration, clears it, toasts, and opens the modal", async () => {
    let payload: RegisterPayload | undefined;
    server.events.on("request:start", async ({ request }) => {
      if (request.url.endsWith("/api/register")) {
        payload = (await request.clone().json()) as RegisterPayload;
      }
    });

    const app = renderApp(LANDING);
    await fillAndSubmit();

    expect(
      await screen.findByText("Account created", {}, { timeout: 3000 }),
    ).toBeInTheDocument();
    expect(payload?.attribution?.params).toEqual({
      utm_source: "fb",
      utm_campaign: "spring",
    });
    expect(localStorage.getItem(ATTRIBUTION_STORAGE_KEY)).toBeNull();

    await waitFor(() => expect(app.url()).toBe(LANDING));
    expect(
      screen.getByRole("dialog", { name: "Your promo code" }),
    ).toHaveTextContent("SAVE10");
    // Still on a URL with utm_* — must not be re-captured post sign-up.
    expect(readAttribution()).toBeNull();

    server.events.removeAllListeners();
  });

  it("keeps attribution when registration fails so a retry still sends it", async () => {
    renderApp(LANDING);
    await fillAndSubmit("taken@example.com");

    expect(
      await screen.findByText("Registration failed", {}, { timeout: 3000 }),
    ).toBeInTheDocument();
    expect(readAttribution()?.params).toEqual({
      utm_source: "fb",
      utm_campaign: "spring",
    });
  });

  it("does not send a payload without attribution when none was captured", async () => {
    let body: RegisterPayload | undefined;
    server.use(
      http.post("/api/register", async ({ request }) => {
        body = (await request.json()) as RegisterPayload;
        return HttpResponse.json({
          user: { id: "1", email: body.email },
          token: "t",
        });
      }),
    );

    renderApp("/register");
    await fillAndSubmit();

    await waitFor(() => expect(body).toBeDefined());
    expect(body?.attribution).toBeNull();
  });
});

describe("attribution capture", () => {
  it("captures params that arrive through in-app navigation", () => {
    const app = renderApp("/");
    expect(readAttribution()).toBeNull();

    act(() => app.navigate("/?utm_source=newsletter"));

    expect(readAttribution()?.params).toEqual({ utm_source: "newsletter" });
  });

  it("keeps first touch for a returning visitor within 30 days", () => {
    const capturedAt = Date.now() - 5 * 24 * 60 * 60 * 1000;
    localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify({ params: { utm_source: "google" }, capturedAt }),
    );

    renderApp("/?utm_source=fb");

    expect(readAttribution()).toEqual({
      params: { utm_source: "google" },
      capturedAt,
    });
  });

  it("overwrites and resets the clock after 30 days", () => {
    localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify({
        params: { utm_source: "google" },
        capturedAt: Date.now() - 31 * 24 * 60 * 60 * 1000,
      }),
    );

    const before = Date.now();
    renderApp("/?gclid=g1");

    const stored = readAttribution();
    expect(stored?.params).toEqual({ gclid: "g1" });
    expect(stored?.capturedAt).toBeGreaterThanOrEqual(before);
  });
});

describe("URL-driven modals for an authenticated user", () => {
  it("opens on cold load on any page, and closing removes only its own param", async () => {
    signIn();
    const app = renderApp("/account?welcome=1&invite=f42&utm_source=fb");

    // Only the top of the stack (last param) is mounted.
    expect(screen.getAllByRole("dialog", { hidden: true })).toHaveLength(1);
    const invite = screen.getByRole("dialog", {
      name: "Your friend invited you",
    });
    expect(invite).toHaveTextContent("f42");

    await userEvent.click(
      within(invite).getByRole("button", { name: "Got it" }),
    );

    await waitFor(() =>
      expect(app.url()).toBe("/account?welcome=1&utm_source=fb"),
    );
    // Welcome is now the top of the stack, and interactive.
    expect(
      await screen.findByRole("dialog", { name: "Welcome" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("dialog", { hidden: true })).toHaveLength(1);
  });

  it("follows in-app navigation and back/forward", async () => {
    signIn();
    const app = renderApp("/");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    act(() => app.navigate("/?welcome=1"));
    expect(
      await screen.findByRole("dialog", { name: "Welcome" }),
    ).toBeInTheDocument();

    act(() => app.navigate(-1));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    act(() => app.navigate(1));
    expect(
      await screen.findByRole("dialog", { name: "Welcome" }),
    ).toBeInTheDocument();
  });

  it("does not let a pending signup param hide the modal beneath it", () => {
    signIn();
    renderApp("/?promo=SAVE10&signup=1");
    expect(
      screen.getByRole("dialog", { name: "Your promo code" }),
    ).toBeInTheDocument();
  });

  it("ignores params with invalid values", () => {
    signIn();
    renderApp("/?welcome=0&promo=");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("routing", () => {
  it("redirects guests from /account to /register", () => {
    const app = renderApp("/account");
    expect(app.url()).toBe("/register?returnTo=%2Faccount");
  });

  it("logs out from /account and lands on /register", async () => {
    signIn();
    const app = renderApp("/account");

    await userEvent.click(screen.getByRole("button", { name: "Log out" }));

    await waitFor(() =>
      expect(app.url()).toBe("/register?returnTo=%2Faccount"),
    );
    expect(localStorage.getItem("auth:session")).toBeNull();
  });

  it("sends an authenticated user on /register to returnTo, not /account", () => {
    signIn();
    const app = renderApp("/register?returnTo=%2F%3Fpromo%3DX");
    expect(app.url()).toBe("/?promo=X");
  });
});
