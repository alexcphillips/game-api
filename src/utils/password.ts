import crypto from "crypto";

const hashData = {
  iterations: 1000,
  len: 64,
  alg: "sha512",
};

export function createSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function hashPassword(password, salt: string = createSalt()) {
  // Hashing user's salt and password with 1000 iterations,
  // 64 length and sha512 digest
  return {
    salt,
    hashedPassword: crypto
      .pbkdf2Sync(
        password,
        salt,
        hashData.iterations,
        hashData.len,
        hashData.alg,
      )
      .toString(`hex`),
  };
}

export function isCorrectPassword(
  unhashedPassword,
  existingSalt,
  existingHashedPassword,
) {
  const { hashedPassword } = hashPassword(unhashedPassword, existingSalt);

  return hashedPassword === existingHashedPassword;
}
