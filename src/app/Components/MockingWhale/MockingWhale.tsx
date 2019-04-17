import * as React from 'react';

interface OuterProps {
	hidden?: boolean;
	say: string;
	onClick?: () => void;
}

interface InnerProps extends OuterProps {}

interface InnerState {}

class MockingWhale extends React.Component<InnerProps, InnerState> {
	onClickHandler = () => (this.props.onClick ? this.props.onClick() : null);

	render() {
		return (
			<div onClick={this.onClickHandler}>
				{this.props.hidden ? 'Invisible' : null} Whale Says: "{this.props.say}"
			</div>
		);
	}
}

export default MockingWhale;
