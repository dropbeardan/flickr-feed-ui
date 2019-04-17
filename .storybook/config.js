import { configure } from '@storybook/react';

// Loads all files ending with ".stories.ts" or ".stories.tsx" in 'src' directory.
const req = require.context('../src', true, /[.]stories[.](ts|js)x?$/);

function loadStories() {
	req.keys().forEach(fileName => req(fileName));
}

configure(loadStories, module);
