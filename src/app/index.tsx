import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';

import { JSSThemeProvider } from './Providers';

import { ImageSearchPage } from './Views';

interface InnerProps {}

interface InnerState {}

export class ReactApp extends React.Component<InnerProps, InnerState> {
	render() {
		return (
			<JSSThemeProvider>
				<ImageSearchPage />
			</JSSThemeProvider>
		);
	}
}

ReactDOM.render(<ReactApp />, document.getElementById('REACT_APP'));
