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
    const baseRect = {
      height: 100,
      left: 0,
      top: 0,
      width: 100,
    };

    const x = calculateX({ baseRect, scale });

    expect(x).toBe(225);
  });
});

describe("calculateY", () => {
  it("should return the expected y value", () => {
    global.innerWidth = 1000;
    global.innerHeight = 1000;

    const scale = 2;
    const baseRect = {
      height: 100,
      left: 0,
      top: 0,
      width: 100,
    };

    const y = calculateY({ baseRect, scale });

    expect(y).toBe(225);
  });
});

describe("calculateScale", () => {
  it("should return the expected scale for a square viewport", () => {
    global.innerWidth = 1000;
    global.innerHeight = 1000;

    const margin = 0;
    const baseRect = {
      height: 100,
      width: 100,
    };

    const scale = calculateScale({ baseRect, margin });

    expect(scale).toBe(10);
  });

  it("should return the expected scale for portrait orientation", () => {
    global.innerWidth = 1000;
    global.innerHeight = 2000;

    const margin = 0;
    const baseRect = {
      height: 100,
      width: 100,
    };

    const scale = calculateScale({ baseRect, margin });

    expect(scale).toBe(10);
  });

  it("should return the expected scale for landscape orientation", () => {
    global.innerWidth = 2000;
    global.innerHeight = 1000;

    const margin = 0;
    const baseRect = {
      height: 100,
      width: 100,
    };

    const scale = calculateScale({ baseRect, margin });

    expect(scale).toBe(10);
  });

  it("should take margin into account", () => {
    global.innerWidth = 1000;
    global.innerHeight = 1000;

    const margin = 250;
    const baseRect = {
      height: 100,
      width: 100,
    };

    const scale = calculateScale({ baseRect, margin });

    expect(scale).toBe(5);
  });
});
