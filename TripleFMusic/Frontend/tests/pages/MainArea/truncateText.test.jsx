import { truncateText } from "../../../src/pages/MainArea/truncateText";

describe("truncateText", () => {
  test("returns the original text if its length is less than or equal to maxLength", () => {
    expect(truncateText("Short text", 20)).toBe("Short text");
  });

  test("truncates the text and appends ellipsis if its length is greater than maxLength", () => {
    expect(truncateText("This is a very long text", 10)).toBe("This is a ...");
  });

  test("returns the full text if maxLength is set to the length of the text", () => {
    expect(truncateText("Exact length", 12)).toBe("Exact length");
  });

  test("handles empty string input", () => {
    expect(truncateText("", 10)).toBe("");
  });

  test("handles maxLength of zero", () => {
    expect(truncateText("Non-empty", 0)).toBe("...");
  });
});
