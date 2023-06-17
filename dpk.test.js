const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  test("returns the partition key when available", () => {
    const event = { partitionKey: "abc" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe("abc");
  });

  test("calculates the partition key from the event object", () => {
    const event = { key1: "value1", key2: "value2" };
    const result = deterministicPartitionKey(event);
    expect(result).toBe(
      "ffd140c5e56d4c2862fbc979fc7f52c7af01967bfa4e3d15650e5258ff59f71c12afa213a12c7990885950c8a05b701f0ab182cb11d57f4e08e2fed822b89a53",
    );
  });

  test("uses a trivial partition key if the candidate is null or undefined", () => {
    const result1 = deterministicPartitionKey(null);
    expect(result1).toBe("0");

    const result2 = deterministicPartitionKey(undefined);
    expect(result2).toBe("0");
  });

  test("calculates the partition key hash if the candidate is too long", () => {
    const candidate = "a".repeat(300);
    const result = deterministicPartitionKey(candidate);
    expect(result).toBe(
      "b39ae2647b4a323c3e1e5808d458faf51703f19b44fe5de64bd01b210cc58f846238d54b7c0f4882743a5bd2628391358a90f7c9eb60cfb44b593012ee83956b",
    );
  });
});
