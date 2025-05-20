import crypto from "crypto";

export function generateToken(length = 32) {
  // Generate random bytes and convert to a hexadecimal string.
  return crypto.randomBytes(length).toString("hex");
}
