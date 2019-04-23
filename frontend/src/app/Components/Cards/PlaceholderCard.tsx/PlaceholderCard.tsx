import * as React from 'react';

import withStyles from 'react-jss';

import { Card, Placeholder } from 'semantic-ui-react';

import { JSSTheme, JSSThemeContext } from '../../../Typings';

interface OuterProps {}

interface InnerProps
	extends OuterProps,
		JSSThemeContext<ReturnType<typeof styles>> {}

interface InnerState {}

const styles = (theme: JSSTheme) => ({
	card: {
		height: '450px'
	}
});

class PlaceholderCardComponent extends React.Component<InnerProps, InnerState> {
	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.card}>
				<Placeholder>
					<Placeholder.Image square />
				</Placeholder>

				<Card.Content>
					<Placeholder>
						<Placeholder.Header>
							<Placeholder.Line length="medium" />
							<Placeholder.Line length="very short" />
						</Placeholder.Header>
						<Placeholder.Paragraph>
							<Placeholder.Line length="short" />
						</Placeholder.Paragraph>
					</Placeholder>
				</Card.Content>

				<Card.Content extra>
					<Placeholder>
						<Placeholder.Paragraph>
							<Placeholder.Line length="very long" />
							<Placeholder.Line length="very long" />
						</Placeholder.Paragraph>
					</Placeholder>
				</Card.Content>
			</Card>
		);
	}
}

export const PlaceholderCard = withStyles(styles)(PlaceholderCardComponent);
