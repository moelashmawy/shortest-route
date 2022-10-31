import { haversineDistance } from "../distance";

describe("Calculate the distance between two points on Earth's surface", () => {
  it("Should return close valid value", () => {
    expect(haversineDistance([1, 1], [2, 2])).toBeCloseTo(157.4);
  });
});
