module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'controllers/**/*.js',
      'middleware/**/*.js',
      'models/**/*.js',
      'services/**/*.js',
      'backend/**/*.js',
      '!src/**/*.test.js',
      '!node_modules/**',
      '!**/node_modules/**'
    ],
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: [
      '**/?(*.)+(spec|test).[tj]s?(x)'
    ],
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    clearMocks: true,
    moduleNameMapper: {
      '^@models/(.*)$': '<rootDir>/models/$1',
      '^@controllers/(.*)$': '<rootDir>/controllers/$1',
      '^@middleware/(.*)$': '<rootDir>/middleware/$1',
      '^@services/(.*)$': '<rootDir>/services/$1',
    },
  };