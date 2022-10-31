import { arraySum, arrayToObject } from "../array";

const mockedList = [1, 2, 3];

describe("Sum array of numbers", () => {
  it("Should return valid value", () => {
    expect(arraySum(mockedList)).toEqual(6);
  });
});

describe("Convert Array to Object", () => {
  it("Should return valid value", () => {
    expect(arrayToObject(["Paris"])).toEqual({
      Paris: { label: "Paris", value: "Paris" }
    });
  });
});
