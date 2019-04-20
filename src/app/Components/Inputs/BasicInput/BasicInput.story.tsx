import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import withStyles from 'react-jss';

import { StorybookPageLayout } from '../../Layouts';

import { BasicInput } from './BasicInput';

import { JSSTheme } from '../../../Typings';

const styles = (theme: JSSTheme) => ({
	storyHeader: {
		display: 'flex',
		flexDirection: 'column',
		'& > *': {
			margin: '5px'
		}
	},
	storyActions: {
		display: 'flex',
		'& > *': {
			margin: '5px'
		}
	}
});

class StoryComponent extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {
			controlled: false,
			error: '',
			loading: false,
			value: ''
		};
	}

	onChangeHandler = (value: string) => this.setState({ value });
	onToggleControlledHandler = () =>
		this.setState((state: any) => ({ controlled: !state.controlled }));
	onToggleLoadingHandler = () =>
		this.setState((state: any) => ({ loading: !state.loading }));
	onChangeErrorHandler = (error: string) => this.setState({ error });
	onChangeLoadingHandler = (loading: boolean) => this.setState({ loading });
	onTabNavigationHandler = (
		direction: 'forward' | 'reverse',
		value: string,
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		event.preventDefault();
		event.stopPropagation();

		action('onTabNavigation')(direction, value, 'CAPTURED EVENT');
	};

	render() {
		const { classes } = this.props;
		const { controlled, error, loading, value } = this.state;

		return (
			<StorybookPageLayout
				headerChildren={
					<div className={classes.storyHeader}>
						<div>
							<b>Current State</b> {JSON.stringify(this.state)}
						</div>
						<div className={classes.storyActions}>
							<div>
								<b>Error:</b>{' '}
								<input
									onChange={event =>
										this.onChangeErrorHandler(event.target.value)
									}
									value={error}
								/>
							</div>
							<div>
								<input
									type="checkbox"
									checked={controlled}
									onChange={this.onToggleControlledHandler}
								/>{' '}
								<b>Controlled</b>
							</div>
							<div>
								<input
									type="checkbox"
									checked={loading}
									onChange={this.onToggleLoadingHandler}
								/>{' '}
								<b>Loading</b>
							</div>
						</div>
					</div>
				}
			>
				<BasicInput
					error={error}
					inputProps={{
						tabIndex: 1
					}}
					label="Search Text"
					loading={loading}
					placeholder="Search Tags (separated by space)"
					value={controlled ? value : undefined}
					onBlur={action('onBlur')}
					onChange={this.onChangeHandler}
					onFocus={action('onFocus')}
					onSubmit={action('onSubmit')}
					onTabNavigation={this.onTabNavigationHandler}
				/>
			</StorybookPageLayout>
		);
	}
}

const StyledStoryComponent = withStyles(styles)(StoryComponent);

storiesOf('Inputs', module).add('Basic Input', () => <StyledStoryComponent />);
