import { http, HttpResponse } from "msw";
import type { RegisterPayload } from "@/features/registration";

export const handlers = [
  http.post("/api/register", async ({ request }) => {
    const body = (await request.json()) as RegisterPayload;

    // Visible pending state, and lets tests assert on loading UI
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Simulate a server-side conflict so error handling is demonstrable
    if (body.email === "taken@example.com") {
      return HttpResponse.json(
        { message: "Email already registered" },
        { status: 409 },
      );
    }

    console.log("[msw] /api/register payload", body); // shows attribution came through

    return HttpResponse.json({
      user: { id: crypto.randomUUID(), email: body.email },
      token: "mock-token",
    });
  }),
];
