module.exports = {
	roots: ['<rootDir>/../src'],
	transform: {
		'^.+\\.(js|ts)x?$': 'ts-jest'
	},
	testRegex: '[.]unit[.](js|ts)x?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
