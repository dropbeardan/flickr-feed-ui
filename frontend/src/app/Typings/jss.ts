import { theme } from '../Providers/JSSThemeProvider';

export type JSSTheme = typeof theme;

export type JSSThemeContext<TStyles> = {
	classes: { [K in keyof TStyles]: any };
	theme: typeof theme;
};
