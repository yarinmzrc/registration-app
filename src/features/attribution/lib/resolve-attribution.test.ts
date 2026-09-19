import { describe, expect, it } from "vitest";
import { ATTRIBUTION_WINDOW_MS } from "../constants";
import { resolveAttribution } from "./resolve-attribution";

const NOW = 1_800_000_000_000;
const DAY = 24 * 60 * 60 * 1000;
const stored = { params: { utm_source: "google" }, capturedAt: NOW - DAY };

describe("resolveAttribution", () => {
  it("captures first touch when nothing is stored", () => {
    expect(
      resolveAttribution({
        stored: null,
        incoming: { utm_source: "fb" },
        now: NOW,
        hasRegistered: false,
      }),
    ).toEqual({ params: { utm_source: "fb" }, capturedAt: NOW });
  });

  it("keeps first touch and ignores new params within 30 days", () => {
    expect(
      resolveAttribution({
        stored,
        incoming: { utm_source: "fb" },
        now: NOW,
        hasRegistered: false,
      }),
    ).toBeNull();
  });

  it("still keeps first touch one ms before the window closes", () => {
    expect(
      resolveAttribution({
        stored: { ...stored, capturedAt: NOW - ATTRIBUTION_WINDOW_MS + 1 },
        incoming: { utm_source: "fb" },
        now: NOW,
        hasRegistered: false,
      }),
    ).toBeNull();
  });

  it("overwrites and resets the clock after 30 days", () => {
    expect(
      resolveAttribution({
        stored: { ...stored, capturedAt: NOW - ATTRIBUTION_WINDOW_MS },
        incoming: { gclid: "abc" },
        now: NOW,
        hasRegistered: false,
      }),
    ).toEqual({ params: { gclid: "abc" }, capturedAt: NOW });
  });

  it("keeps expired attribution when the new visit has no params", () => {
    expect(
      resolveAttribution({
        stored: { ...stored, capturedAt: NOW - 45 * DAY },
        incoming: {},
        now: NOW,
        hasRegistered: false,
      }),
    ).toBeNull();
  });

  it("never captures for registered users", () => {
    expect(
      resolveAttribution({
        stored: null,
        incoming: { utm_source: "fb" },
        now: NOW,
        hasRegistered: true,
      }),
    ).toBeNull();
  });
});
