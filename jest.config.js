module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.ts',
        '!**/node_modules/**',
        '!**/test/**',
        '!**/src/types/**',
    ],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/.cache/'],
    moduleDirectories: ['node_modules', 'src'],
};
