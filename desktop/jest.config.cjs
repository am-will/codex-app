const { createDefaultPreset } = require('ts-jest');

const tsJestPreset = createDefaultPreset({
  tsconfig: './tsconfig.jest.json',
});

module.exports = {
  ...tsJestPreset,
  clearMocks: true,
  rootDir: '.',
  roots: ['<rootDir>/tests/linux'],
  testEnvironment: 'node',
  testMatch: ['**/*.test.[jt]s'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/out/'],
  verbose: true,
};
