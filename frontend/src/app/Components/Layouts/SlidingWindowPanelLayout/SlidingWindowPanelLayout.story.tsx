import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import withStyles from 'react-jss';

import { SlidingWindowPanelLayout } from './SlidingWindowPanelLayout';
import { StorybookPageLayout } from '../StorybookPageLayout';

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
			isOpen: true,
			isVisible: true,
			slideDirection: 'column',
			transition: undefined
		};
	}

	generateInputProps = () => {
		const { isOpen, isVisible, slideDirection, transition } = this.state;

		return {
			slideDirection,
			transition,
			windows: [
				{
					column: {
						index: 0,
						flexRatio: slideDirection === 'column' && !isOpen ? 0 : 1
					},
					row: {
						index: 0,
						flexRatio: slideDirection === 'row' && !isOpen ? 0 : 1
					},
					isVisible,
					children: (
						<div
							style={{
								height: '100%',
								width: '100%',
								background: 'black',
								color: 'white'
							}}
						>
							COLUMN 0, ROW 0
						</div>
					)
				},
				{
					column: {
						index: 0,
						flexRatio: slideDirection === 'column' && isOpen ? 0 : 1
					},
					row: {
						index: 1,
						flexRatio: slideDirection === 'row' && isOpen ? 0 : 1
					},
					children: (
						<div
							style={{
								height: '100%',
								width: '100%',
								background: 'white',
								color: 'black'
							}}
						>
							COLUMN 0, ROW 1
						</div>
					)
				},
				{
					column: {
						index: 1,
						flexRatio: slideDirection === 'column' && isOpen ? 0 : 1
					},
					row: {
						index: 0,
						flexRatio: slideDirection === 'row' && isOpen ? 0 : 1
					},
					children: (
						<div
							style={{
								height: '100%',
								width: '100%',
								background: 'white',
								color: 'black'
							}}
						>
							COLUMN 1, ROW 0
						</div>
					)
				},
				{
					column: {
						index: 1,
						flexRatio: slideDirection === 'column' && !isOpen ? 0 : 1
					},
					row: {
						index: 1,
						flexRatio: slideDirection === 'row' && !isOpen ? 0 : 1
					},
					isVisible,
					children: (
						<div
							style={{
								height: '100%',
								width: '100%',
								background: 'black',
								color: 'white'
							}}
						>
							COLUMN 1, ROW 1
						</div>
					)
				}
			]
		};
	};

	onChangeSlideDirection = (slideDirection: string) =>
		this.setState({ slideDirection });
	onChangeTransition = (transition: number) => this.setState({ transition });
	onClose = () => this.setState({ isOpen: false });
	onOpen = () => this.setState({ isOpen: true });
	onFadeOut = () => this.setState({ isOpen: false, isVisible: false });
	onFadeIn = () => this.setState({ isOpen: true, isVisible: true });
	onHide = () => this.setState({ isVisible: false });
	onShow = () => this.setState({ isVisible: true });

	render() {
		const { classes } = this.props;
		const { slideDirection, transition } = this.state;
		const inputProps = this.generateInputProps();

		return (
			<StorybookPageLayout
				headerChildren={
					<div className={classes.storyHeader}>
						<div>
							<b>Current State</b> {JSON.stringify(this.state)}
						</div>
						<div>
							<b>Current Props</b>{' '}
							{JSON.stringify({
								...inputProps,
								windows: inputProps.windows.map(window => ({
									...window,
									children: 'JSX ELEMENT'
								}))
							})}
						</div>
						<div className={classes.storyActions}>
							<div>
								{`Slide Direction: `}
								<select
									value={slideDirection}
									onChange={e => this.onChangeSlideDirection(e.target.value)}
								>
									<option value="column">column</option>
									<option value="row">row</option>
								</select>
							</div>
							<div>
								{`Transition (ms): `}
								<input
									type="number"
									value={transition}
									onChange={e =>
										this.onChangeTransition(Number(e.target.value))
									}
								/>
							</div>
							<button onClick={this.onOpen}>OPEN</button>
							<button onClick={this.onClose}>CLOSE</button>
							<button onClick={this.onShow}>SHOW</button>
							<button onClick={this.onHide}>HIDE</button>
							<button onClick={this.onFadeIn}>FADE IN</button>
							<button onClick={this.onFadeOut}>FADE OUT</button>
						</div>
					</div>
				}
			>
				<SlidingWindowPanelLayout {...inputProps} />
			</StorybookPageLayout>
		);
	}
}

const StyledStoryComponent = withStyles(styles)(StoryComponent);

storiesOf('Layouts', module).add('SlidingWindowPanelLayout', () => (
	<StyledStoryComponent />
));
