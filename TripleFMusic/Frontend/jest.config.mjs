// test.config.js
export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/index.js',
    '/src/main.jsx',
    '/src/pages/Images/',
    '/src/assets/'
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/tests/__mocks__/fileMock.js'
  },
  transform: {
    '^.+\\.jsx?$': 'babel-jest'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ],
  roots: [
    '<rootDir>/tests',
    '<rootDir>/src'
  ]
};