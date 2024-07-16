export const ValidatorConstants = {
  MIN_LENGTH_USERNAME: 6,
  MAX_LENGTH_USERNAME: 16,
  MIN_LENGTH_PASSWORD: 10,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{10,}$/,
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

export const ValidatorMessageConstants = {
  MAX_LENGTH: (name: string, value: number) =>
    `${name} should not exceed ${value} characters`,
  MIN_LENGTH: (name: string, value: number) =>
    `${name} should have at least ${value} characters`,
  REQUIRED: (name: string) => `${name} is required!`,
  PASSWORD_REGEX: (name: string) =>
    `${name} should contains at least 1 uppercase, 1 lowercase, 1 special and 1 digit`,
  EMAIL: `Email is invalid`,
};
