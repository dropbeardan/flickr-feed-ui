import * as React from 'react';

import withStyles from 'react-jss';

import { JSSTheme, JSSThemeContext } from '../../Typings';

const styles = (theme: JSSTheme) => ({
	layout: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: 'calc(100vh - 16px)'
	}
});

interface OuterProps {
	headerChildren?: React.ReactNode;
}

interface InnerProps
	extends OuterProps,
		JSSThemeContext<ReturnType<typeof styles>> {}

interface InnerState {}

/**
 * Basic page layout container for Storybook story use.
 */
class StorybookPageLayoutComponent extends React.Component<
	InnerProps,
	InnerState
> {
	render() {
		const { children, classes, headerChildren } = this.props;

		return (
			<div className={classes.layout}>
				{headerChildren}
				{children}
			</div>
		);
	}
}

export const StorybookPageLayout = withStyles(styles)(
	StorybookPageLayoutComponent
);
