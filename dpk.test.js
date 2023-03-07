const {
  MAX_PARTITION_KEY_LENGTH,
  TRIVIAL_PARTITION_KEY,
  deterministicPartitionKey,
  generateCandidateHash,
} = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the TRIVIAL_PARTITION_KEY when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe(TRIVIAL_PARTITION_KEY);
  });

  it("Returns the partition key when provided in the event param", () => {
    const PARTITION_KEY = 'Working!';
    const event = {
      partitionKey: PARTITION_KEY,
    };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(PARTITION_KEY);
  });

  it("Returns a hash when the provided partition key is too large", () => {
    const PARTITION_KEY = 'This is a really long partition key that should be converted into a hash as it will exceed the MAX_PARTITION_KEY_LENGTH.'.padEnd(MAX_PARTITION_KEY_LENGTH + 1, ' ');
    const event = {
      partitionKey: PARTITION_KEY,
    };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).not.toBe(PARTITION_KEY);
    expect(partitionKey.length).toBe(128);
  });

  it("Returns a candidate hash when no partition key is provided in the event param object", () => {
    const event = {
      some: 'values',
    };
    const hash = generateCandidateHash(event);
    const key = deterministicPartitionKey(event);
    expect(key.length).toBe(128);
    expect(key).toBe(hash);
  });
});