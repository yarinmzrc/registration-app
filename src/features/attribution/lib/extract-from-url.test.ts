import { describe, expect, it } from "vitest";
import { extractAttributionParams } from "./extract-from-url";

describe("extractAttributionParams", () => {
  it("keeps utm_*, ref, gclid and fbclid and drops everything else", () => {
    const params = new URLSearchParams(
      "utm_source=fb&utm_campaign=spring&ref=abc&gclid=g1&fbclid=f1&promo=X&welcome=1",
    );

    expect(extractAttributionParams(params)).toEqual({
      utm_source: "fb",
      utm_campaign: "spring",
      ref: "abc",
      gclid: "g1",
      fbclid: "f1",
    });
  });

  it("ignores empty values", () => {
    expect(
      extractAttributionParams(new URLSearchParams("utm_source=&ref=")),
    ).toEqual({});
  });
});
