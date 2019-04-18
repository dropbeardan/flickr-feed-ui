import * as React from 'react';

import { ThemeProvider } from 'react-jss';

export const theme = {
	palette: {
		primary: 'grey',

		// Semantic UI themed colours.
		// https://semantic-ui.com/usage/theming.html
		red: '#B03060',
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
		grey: '#A0A0A0',
		black: '#000000'
	}
};

export class JSSThemeProvider extends React.Component {
	render() {
		return (
			<ThemeProvider theme={theme}>{this.props.children as any}</ThemeProvider>
		);
	}
}
