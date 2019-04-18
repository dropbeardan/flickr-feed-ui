import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';

import { JSSThemeProvider } from './Providers';

interface InnerProps {}

interface InnerState {}

export class ReactApp extends React.Component<InnerProps, InnerState> {
	render() {
		return (
			<JSSThemeProvider>
				<h1>Current Running Env Mode: {process.env.NODE_ENV}</h1>
			</JSSThemeProvider>
		);
	}
}

ReactDOM.render(<ReactApp />, document.getElementById('REACT_APP'));
