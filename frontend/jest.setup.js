import { TextEncoder, TextDecoder } from "util";
import '@testing-library/jest-dom';
import 'whatwg-fetch';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mocking console.error to suppress known errors (like network errors)
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((msg) => {
    if (
      msg?.includes("Network Error") ||
      msg?.includes("404 Not Found")
    ) return; // Suppress known expected errors
    console.warn("Unexpected console.error:", msg); // Optional: Warn for unknown errors
  });
});

afterAll(() => {
  console.error.mockRestore();
});

// Mock BroadcastChannel for MSW in Node environment
global.BroadcastChannel = class {
  postMessage() {}
  addEventListener() {}
  removeEventListener() {}
  close() {}
};
