module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	verbose: true,
	roots: [
		'<rootDir>/src'
	],
	transform: {
		'^.+\\.ts?$': 'ts-jest'
	},
	moduleNameMapper: {
		'@config/(.*)': '<rootDir>/src/config/$1',
		'@core/(.*)': '<rootDir>/src/core/$1',
		'@api/(.*)': '<rootDir>/src/api/$1',
	}
};

