import { addDecorator, configure } from '@storybook/react';

import { withThemesProvider } from 'storybook-addon-jss-theme';

import { theme } from '../src/app/Providers/JSSThemeProvider';

const themes = [{ name: 'JSSProviderTheme', variables: theme }];
addDecorator(withThemesProvider(themes));

// Loads all files ending with ".stories.ts" or ".stories.tsx" in 'src' directory.
const req = require.context('../src', true, /[.]stories[.](ts|js)x?$/);

function loadStories() {
	req.keys().forEach(fileName => req(fileName));
}

configure(loadStories, module);
