/* eslint-disable import/no-default-export */
import type { Config } from '@jest/types'

export default async (): Promise<Config.InitialOptions> => ({
    verbose: true,
    testEnvironment: 'node',
    clearMocks: true,
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/main/**',
        '!<rootDir>/src/**/*-ports.ts',
        '!**/ports/**',
        '!**/test/**',
        '!**/config/**'
    ],
    coverageDirectory: 'coverage',
    setupFiles: ['dotenv/config'],
    moduleNameMapper: {
        '^@adapters/(.*)$': '<rootDir>/src/adapters/$1',
        '^@core/(.*)$': '<rootDir>/src/core/$1',
        '^@external/(.*)$': '<rootDir>/src/external/$1',
        '^@main/(.*)$': '<rootDir>/src/main/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1'
    },
    reporters: ['default', 'jest-junit']
})
