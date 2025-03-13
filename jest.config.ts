/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["./server/**/*.ts"],
  coverageDirectory: "./coverage/server",
  coverageThreshold: {
    global: {
      branch: 70,
      functions: 60,
      lines: 70,
      statements: 70,
    },
  },
  coveragePathIgnorePatterns: [".model.ts"],
  testPathIgnorePatterns: ["/node_modules", "/dist", "/dist-deploy"],
};
