module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/src/index.js',
    ],
  };