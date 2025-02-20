/** @type {import('ts-jest').JestConfigWithTsJest} */
process.env.NODE_ENV = "test";

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'], // Adjust as needed
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
