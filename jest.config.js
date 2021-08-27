/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  bail: true,
  preset: 'ts-jest',
  testMatch: ['**/__tests__/**/*.test.ts?(x)'],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
}
