import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Mock environment variables
process.env.VITE_API_URL = "http://localhost:4000";
