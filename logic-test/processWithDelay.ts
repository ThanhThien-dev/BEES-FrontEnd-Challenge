// Custom error class for invalid input
class InvalidInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidInputError";
  }
}

// Utility function to create a delay
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Main function with required and bonus features
async function processWithDelay(
  numbers: number[],
  options: {
    delayMs?: number; // Customizable delay (default: 1000ms)
    onProgress?: (current: number, total: number) => void; // Progress tracking
    signal?: AbortSignal; // Cancellation support
  } = {}
): Promise<void> {
  const { delayMs = 1000, onProgress, signal } = options;

  // Validate input
  if (!Array.isArray(numbers)) {
    throw new InvalidInputError("Input must be an array");
  }
  if (!numbers.every((num) => typeof num === "number" && !isNaN(num))) {
    throw new InvalidInputError("All elements must be valid numbers");
  }

  // Handle empty array
  if (numbers.length === 0) {
    return Promise.resolve();
  }

  // Process numbers sequentially
  for (let i = 0; i < numbers.length; i++) {
    if (signal?.aborted) {
      throw new Error("Process was aborted");
    }

    console.log(numbers[i]); // Print current number

    // Report progress if callback is provided
    if (onProgress) {
      onProgress(i + 1, numbers.length);
    }

    // Add delay except for the last element
    if (i < numbers.length - 1) {
      await delay(delayMs);
    }
  }
}

// Test cases to demonstrate functionality
(async () => {
  try {
    // Test 1: Basic functionality
    console.log("Test 1: Basic processing");
    await processWithDelay([1, 2, 3]);

    // Test 2: Empty array
    console.log("\nTest 2: Empty array");
    await processWithDelay([]);
    console.log("Empty array processed successfully");

    // Test 3: Custom delay and progress
    console.log("\nTest 3: Custom delay and progress");
    await processWithDelay([1, 2, 3, 4, 5, 6], {
      delayMs: 2000,
      onProgress: (current, total) =>
        console.log(`Progress: ${current}/${total}`),
    });

    // Test 4: Cancellation
    console.log("\nTest 4: Cancellation");
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1200); // Abort after 1.2s
    await processWithDelay([1, 2, 3, 4], { signal: controller.signal });

    // Test 5: Invalid input
    console.log("\nTest 5: Invalid input");
    await processWithDelay([1, "2", 3] as any); // Should throw error
  } catch (error: any) {
    console.error("Error:", error.message);
  }
})();
