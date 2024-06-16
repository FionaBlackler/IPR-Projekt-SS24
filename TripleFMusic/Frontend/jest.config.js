module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['/src/setupTest.js'],
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/src/index.js',
      '/src/main.jsx',  // Added main.jsx to ignore coverage for entry point
      '/src/pages/Images/',  // Ignoring image files
      '/src/assets/'  // Ignoring assets folder
    ],
    moduleNameMapper: {
      "\\.(css|less)$": "identity-obj-proxy",  // Mocking CSS imports for Jest
    },
    transform: {
      "^.+\\.jsx?$": "babel-jest",  // Transpiling JS and JSX files with Babel
    },
    testPathIgnorePatterns: [
      '/node_modules/',
      '/dist/'  // Ignoring dist folder for tests
    ],
};