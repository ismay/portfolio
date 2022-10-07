import { calculateScale, calculateX, calculateY } from "./calculate";

afterEach(() => {
  delete global.innerHeight;
  delete global.innerWidth;
});

describe("calculateX", () => {
  it("should return the expected x value", () => {
    global.innerWidth = 1000;
    global.innerHeight = 1000;

    const scale = 2;
    const left = 0;
    const width = 100;

    const x = calculateX({ left, scale, width });

    expect(x).toBe(225);
  });
});

describe("calculateY", () => {
  it("should return the expected y value", () => {
    global.innerWidth = 1000;
    global.innerHeight = 1000;

    const scale = 2;
    const height = 100;
    const top = 0;

    const y = calculateY({ height, scale, top });

    expect(y).toBe(225);
  });
});

describe("calculateScale", () => {
  it("should return the expected scale for a square viewport", () => {
    global.innerWidth = 1000;
    global.innerHeight = 1000;

    const margin = 0;
    const height = 100;
    const width = 100;

    const scale = calculateScale({ height, margin, width });

    expect(scale).toBe(10);
  });

  it("should return the expected scale for portrait orientation", () => {
    global.innerWidth = 1000;
    global.innerHeight = 2000;

    const margin = 0;
    const height = 100;
    const width = 100;

    const scale = calculateScale({ height, margin, width });

    expect(scale).toBe(10);
  });

  it("should return the expected scale for landscape orientation", () => {
    global.innerWidth = 2000;
    global.innerHeight = 1000;

    const margin = 0;
    const height = 100;
    const width = 100;

    const scale = calculateScale({ height, margin, width });

    expect(scale).toBe(10);
  });

  it("should take margin into account", () => {
    global.innerWidth = 1000;
    global.innerHeight = 1000;

    const margin = 250;
    const height = 100;
    const width = 100;

    const scale = calculateScale({ height, margin, width });

    expect(scale).toBe(5);
  });
});
