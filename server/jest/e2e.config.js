module.exports = {
	roots: ['<rootDir>/../e2e-tests'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testEnvironment: 'node',
	testRegex: '[.]e2e[.](js|ts)x?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
