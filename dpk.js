// Modules
const crypto = require("crypto");

/**
 * @module DPK
 *
 * @description For the refactor of this module I made the following changes:
 *
 * - Move all the 'static' values on top as configuration constants in order
 * to being able to modify those values easily if the module grows in size.
 * This will also help to prevent changing it multiple times if any of those
 * values is being used in multiple places (currently now happening but as a
 * precaution).
 * 
 * - The 'static' configuration constants have a clear name of what they are
 * (kind of the no-magic-numbers rule on eslint).
 * 
 * - The logic is split in 3 functions that has specific functionality
 * summarized in the name so it's more readable and clear and easier to
 * modify in the future.
 * 
 * - All methods has their JSDOC with params and returns definitions (would
 * be better with typescript) and no internal comments as any function should
 * be readable by the code or more refactoring is needed.
 */

// Configs
const HASH_ALGORITHM = 'sha3-512';
const HASH_ENCODING = 'hex';
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/**
 * Generates a Hash for a candidate using the configured hash algorithm.
 * 
 * If a provided candidate not being a string typeof, is going to be
 * stringified with the JSON stringify method.
 *
 * @param {any} candidate
 *
 * @returns {string}
 */
function generateCandidateHash(candidate) {
  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate);
  }
  return crypto.createHash(HASH_ALGORITHM).update(candidate).digest(HASH_ENCODING);
}

/**
 * Sanitize a candidate value.
 * 
 * For a provided candidate is treated as `false` 
 * (`undefined|null|''|false|NaN|0`) the `TRIVIAL_PARTITION_KEY` is returned.
 * 
 * If a provided candidate not being a string typeof, is going to be
 * stringified with the JSON stringify method.
 * 
 * If the resulting candidate is bigger in length than the
 * `MAX_PARTITION_KEY_LENTH` value, a new candidate hash is going to be
 * returned. 
 * 
 * @param {string|object} [candidate]
 *
 * @returns {string}
 */
function sanitizeCandidate(candidate) {
  if (!candidate) return TRIVIAL_PARTITION_KEY;
  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate);
  }
  return candidate.length > MAX_PARTITION_KEY_LENGTH
    ? generateCandidateHash(candidate)
    : candidate;
}

/**
 * Deterministic partition key. 
 */
const deterministicPartitionKey = (event) => {
  const candidate = event && (
    event.partitionKey 
    || generateCandidateHash(event)
  );
  return sanitizeCandidate(candidate);
};

module.exports = {
  deterministicPartitionKey,
  generateCandidateHash,
  MAX_PARTITION_KEY_LENGTH,
  TRIVIAL_PARTITION_KEY, // Unsure if this values should be public/exported
}