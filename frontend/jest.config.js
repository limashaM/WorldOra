module.exports = {
  testEnvironment: "jsdom", // Use jsdom for simulating browser-like environment
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Runs once after environment setup
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest" // Use babel-jest for JS/TS/React files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(undici)/)" // Allow transform for 'undici' if needed
  ],
  moduleNameMapper: {
    // Mock static asset imports
    "\\.(gif|jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.js",
    // Mock CSS imports
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testMatch: [
    "**/__test__/**/*.[jt]s?(x)", // Look for tests inside __test__ folders
  ]
};
