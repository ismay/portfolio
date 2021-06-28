import calculateSizes from "./thumbnail-sizes";

const layouts = [
  { amount: 1, index: 0, number: 1 },
  { amount: 2, index: 1, number: 2 },
  { amount: 3, index: 2, number: 3 },
];

describe("calculateSizes", () => {
  it.each(layouts)(
    "should return the expected sizes for image $number of total $amount",
    ({ amount, index, number }) => {
      expect(index + 1).toBe(number);
      expect(calculateSizes({ amount, index })).toMatchSnapshot();
    }
  );
});
