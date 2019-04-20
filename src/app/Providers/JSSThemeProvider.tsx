import * as React from 'react';

import { ThemeProvider } from 'react-jss';

const palette = {
	// Semantic UI themed colours.
	// https://semantic-ui.com/usage/theming.html
	orange: '#FE9A76',
	yellow: '#FFD700',
	olive: '#32CD32',
	green: '#016936',
	teal: '#008080',
	blue: '#0E6EB8',
	violet: '#EE82EE',
	purple: '#B413EC',
	pink: '#FF1493',
	brown: '#A52A2A',
	black: '#000000',

	/**
	 * Material UI themed colours.
	 * https://material-ui.com/style/color/
	 *
	 * @note Light: 300, Normal: 500, Dark: 700
	 */
	grey: {
		light: '#E0E0E0',
		normal: '#9E9E9E',
		dark: '#616161'
	},

	/**
	 * Based off palette for Semantic UI error input.
	 */
	red: {
		light: '#FFF6F6',
		normal: '#E0B4B4',
		dark: '#9F3A38'
	}
};

export const theme = {
	palette: {
		...palette,
		primary: palette.grey,
		error: palette.red
	}
};

export class JSSThemeProvider extends React.Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<React.Fragment>{this.props.children}</React.Fragment>
			</ThemeProvider>
		);
	}
}
