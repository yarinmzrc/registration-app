import { describe, expect, it } from "vitest";
import { parseModalParams } from "./parse-modal-params";

const parse = (search: string) => parseModalParams(new URLSearchParams(search));

describe("parseModalParams", () => {
  it("returns the stack in URL order, last param on top", () => {
    expect(parse("invite=f1&utm_source=fb&promo=SAVE10&welcome=1&signup=1")).toEqual([
      { type: "invite", value: "f1" },
      { type: "promo", value: "SAVE10" },
      { type: "welcome", value: "1" },
      { type: "signup", value: "1" },
    ]);
  });

  it("uses the first value when a param is repeated", () => {
    expect(parse("promo=A&welcome=1&promo=B")).toEqual([
      { type: "promo", value: "A" },
      { type: "welcome", value: "1" },
    ]);
  });

  it("only opens flag modals on =1", () => {
    expect(parse("welcome=0&signup=")).toEqual([]);
  });

  it("ignores promo/invite without a value", () => {
    expect(parse("promo=&invite=%20")).toEqual([]);
  });

  it("ignores unrelated params", () => {
    expect(parse("utm_source=fb&returnTo=%2F")).toEqual([]);
  });
});
