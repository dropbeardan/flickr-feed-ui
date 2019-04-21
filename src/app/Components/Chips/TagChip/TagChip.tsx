import * as React from 'react';

import withStyles from 'react-jss';

import { Icon, Label } from 'semantic-ui-react';

import {
	Promisable,
	NoResponse,
	JSSTheme,
	JSSThemeContext
} from '../../../Typings';

interface OuterProps {
	label: string;
	onClick?: (event: React.MouseEvent<HTMLElement>) => Promisable<NoResponse>;
	onClose?: (event: React.MouseEvent<HTMLElement>) => Promisable<NoResponse>;
}

interface InnerProps
	extends OuterProps,
		JSSThemeContext<ReturnType<typeof styles>> {}

interface InnerState {}

const styles = (theme: JSSTheme) => ({
	closeIcon: {
		color: theme.palette.grey.normal,
		transition: '250ms !important',
		'&:hover': {
			color: theme.palette.red.dark
		}
	}
});

class TagChipComponent extends React.Component<InnerProps, InnerState> {
	onClickHandler = (event: React.MouseEvent<HTMLElement>) => {
		const { onClick } = this.props;

		if (onClick) {
			return onClick(event);
		}
	};

	onCloseHandler = (event: React.MouseEvent<HTMLElement>) => {
		const { onClose } = this.props;

		event.stopPropagation();

		if (onClose) {
			return onClose(event);
		}
	};

	render() {
		const { classes, label, onClose } = this.props;

		return (
			<Label.Group>
				<Label as="a" size="large" onClick={this.onClickHandler}>
					{label}
					{onClose ? (
						<Icon
							className={classes.closeIcon}
							name="close"
							onClick={this.onCloseHandler}
						/>
					) : null}
				</Label>
			</Label.Group>
		);
	}
}

export const TagChip = withStyles(styles)(TagChipComponent);
