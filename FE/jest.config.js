module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'page.js'],
  testMatch: ['**/*.(test|spec).(js|jsx)'],
  globals: {
    'ts-jest': {
      useBabelrc: true,
      tsConfigFile: 'jest.tsconfig.json',
    },
  },
  coveragePathIgnorePatterns: ['/node_modules/', 'enzyme.js'],
  setupFilesAfterEnv: ['<rootDir>/enzyme.js'],
  coverageReporters: ['json', 'lcov', 'text', 'text-summary'],
  moduleNameMapper: {
    '^@/(.+)$': '<rootDir>/src/$1',
  },
};
