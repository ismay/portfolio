export default function calculateSizes({ amount, index }) {
  const remainderForTwo = amount % 2;
  const isLast = index + 1 === amount;
  const sizes = [];

  /**
   * Going through the sizes from large to small viewport
   */

  // Large
  if (remainderForTwo === 1 && isLast) {
    // It will be full width
    sizes.push("(min-width: 50em) 50em");
  } else {
    // It will be half the available width
    sizes.push("(min-width: 50em) 25em");
  }

  // Medium
  if (remainderForTwo === 1 && isLast) {
    // It will be full width
    sizes.push("(min-width: 30em) 100vw");
  } else {
    // It will be half the available width
    sizes.push("(min-width: 30em) 50vw");
  }

  // Small
  sizes.push(
    // All images are full width at the smallest size
    "100vw"
  );

  return sizes.join(", ");
}
