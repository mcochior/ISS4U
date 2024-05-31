
const jestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: ['**/test/**/*.test.(ts|js)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
};

export default jestConfig;
