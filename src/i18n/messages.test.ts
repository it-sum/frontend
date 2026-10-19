import { describe, expect, it } from "vitest";
import ar from "../../messages/ar.json";
import en from "../../messages/en.json";

function getLeafKeys(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      getLeafKeys(item, `${prefix}[${index}]`),
    );
  }

  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, child]) =>
      getLeafKeys(child, prefix ? `${prefix}.${key}` : key),
    );
  }

  return [prefix];
}

describe("locale message structure", () => {
  it("keeps Arabic and English translation keys in sync", () => {
    expect(getLeafKeys(ar).sort()).toEqual(getLeafKeys(en).sort());
  });
});
