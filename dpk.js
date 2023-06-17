const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  let candidate = getPartitionKeyCandidate(event) || TRIVIAL_PARTITION_KEY;

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = hashCandidate(candidate);
  }

  return candidate;
};

function getPartitionKeyCandidate(event) {
  if (event) {
    if (event.partitionKey) {
      return event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      return crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  return event;
}

function hashCandidate(candidate) {
  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  return crypto.createHash("sha3-512").update(candidate).digest("hex");
}
