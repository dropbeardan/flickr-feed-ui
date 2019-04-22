import * as React from 'react';

// import axios from 'axios';
import * as moment from 'moment';

import withStyles from 'react-jss';

import { deduplicateArray } from '../Helpers';

import {
	BasicInput,
	ImageCard,
	SlidingWindowPanelLayout,
	TagChip
} from '../Components';

import { JSSTheme, JSSThemeContext } from '../Typings';

interface OuterProps {}

interface InnerProps
	extends OuterProps,
		JSSThemeContext<ReturnType<typeof styles>> {}

interface InnerState {
	hasSearched: boolean;
	loading: boolean;
	searchValue: string;
	tags: string[];
}

const styles = (theme: JSSTheme) => ({
	layout: {
		height: '100vh',
		width: '100vw'
	},
	searchContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
		padding: 2 * theme.spacing.unit
	},
	inputContainer: {
		width: '40%',
		minWidth: '200px'
	},
	tagContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		marginTop: theme.spacing.unit,
		height: '10vh',
		minHeight: '100px',
		width: '100%',
		overflow: 'auto',
		'& > *': {
			margin: 0.5 * theme.spacing.unit
		}
	},
	cardContainer: {
		display: 'flex',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		height: '100%',
		width: '100%',
		padding: 2 * theme.spacing.unit
	},
	card: {
		margin: 2 * theme.spacing.unit
	}
});

class ImageSearchPageComponent extends React.Component<InnerProps, InnerState> {
	constructor(props: InnerProps) {
		super(props);

		this.state = {
			hasSearched: false,
			loading: false,
			searchValue: '',
			tags: []
		};
	}

	onAddTagHandler = (targetTag: string) => {
		const { tags } = this.state;

		if (!tags.some(tag => tag === targetTag)) {
			this.setState((state: InnerState) => ({
				loading: true,
				tags: deduplicateArray([...state.tags, targetTag])
			}));
		}
	};

	onChangeSearchValueHandler = (searchValue: string) =>
		this.setState({ searchValue });

	onRemoveTagHandler = (targetTag: string) => () =>
		this.setState((state: InnerState) => ({
			loading: true,
			tags: state.tags.filter(tag => tag !== targetTag)
		}));

	onSearchHandler = (value: string) => {
		const updatedTags = deduplicateArray([
			...this.state.tags,
			...value.split(' ')
		]);

		this.setState({
			hasSearched: true,
			loading: true,
			searchValue: '',
			tags: updatedTags
		});
	};

	render() {
		const { classes } = this.props;
		const { hasSearched, loading, tags, searchValue } = this.state;

		return (
			<div className={classes.layout}>
				<SlidingWindowPanelLayout
					slideDirection="column"
					windows={[
						{
							column: { index: 0, flexRatio: hasSearched ? undefined : 1 },
							row: { index: 0, flexRatio: 1 },
							children: (
								<div className={classes.searchContainer}>
									<div className={classes.inputContainer}>
										<BasicInput
											loading={loading}
											placeholder="Search Images by Tags (separate tags by space)"
											onChange={this.onChangeSearchValueHandler}
											onSubmit={this.onSearchHandler}
											value={searchValue}
										/>
									</div>

									<div className={classes.tagContainer}>
										{tags.map(tag => (
											<TagChip
												key={tag}
												label={tag}
												onClose={this.onRemoveTagHandler(tag)}
											/>
										))}
									</div>
								</div>
							)
						},
						{
							column: { index: 0, flexRatio: hasSearched ? 1 : 0 },
							row: { index: 1, flexRatio: 0 },
							children: (
								<div className={classes.cardContainer}>
									{tags.map(tag => (
										<div key={tag} className={classes.card}>
											<ImageCard
												date={moment('2019-04-20T21:45:48Z').format(
													'DD-MMMM-YYYY'
												)}
												author="Nad"
												authorURL="https://www.flickr.com/photos/nad/"
												image="https://live.staticflickr.com/65535/33776493008_6d8d201e5b_m.jpg"
												imageURL="https://www.flickr.com/photos/nad/33776493008/"
												tags={[tag]}
												title="Foxy"
												onClickTag={this.onAddTagHandler}
											/>
										</div>
									))}
								</div>
							)
						}
					]}
				/>
			</div>
		);
	}
}

export const ImageSearchPage = withStyles(styles)(ImageSearchPageComponent);
