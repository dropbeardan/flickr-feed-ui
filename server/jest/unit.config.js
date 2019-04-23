module.exports = {
	roots: ['<rootDir>/../src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	testEnvironment: 'node',
	testRegex: '[.]unit[.](js|ts)x?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
