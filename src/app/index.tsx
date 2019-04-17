import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MockingWhale } from './Components/MockingWhale';

export interface HelloProps {
	compiler: string;
	framework: string;
}

export class Hello extends React.Component<HelloProps, {}> {
	render() {
		return (
			<React.Fragment>
				<h1>
					Hello from {this.props.compiler} and {this.props.framework}!
				</h1>

				<h1>Current Running Env Mode: {process.env.NODE_ENV}</h1>

				<MockingWhale say="hello" />
			</React.Fragment>
		);
	}
}

ReactDOM.render(
	<Hello compiler="TypeScript" framework="React" />,
	document.getElementById('REACT_APP')
);
