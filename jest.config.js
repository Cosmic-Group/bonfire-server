module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/domain/**',
    '!<rootDir>/src/presentation/errors/**',
    '!<rootDir>/src/infra/postgres/entities/**',
    '!<rootDir>/src/infra/postgres/migrations/**',
    '!<rootDir>/src/infra/postgres/helpers/mocks/**',
    '!**/test/**',
    '!<rootDir>/src/**/*-protocols.ts',
    '!<rootDir>/src/**/index.ts',
    '!**/protocols/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  clearMocks: true
}
