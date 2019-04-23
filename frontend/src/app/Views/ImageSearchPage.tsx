import * as React from 'react';

import axios from 'axios';
import * as moment from 'moment';

import withStyles from 'react-jss';

import { SERVER_URL } from '../Configs';

import { deduplicateArray } from '../Helpers';

import { Header } from 'semantic-ui-react';

import {
	BasicInput,
	ImageCard,
	PlaceholderCard,
	SlidingWindowPanelLayout,
	TagChip
} from '../Components';

import { JSSTheme, JSSThemeContext, TNode_Env } from '../Typings';

interface OuterProps {}

interface InnerProps
	extends OuterProps,
		JSSThemeContext<ReturnType<typeof styles>> {}

interface IFeed {
	author: string;
	authorURL: string;
	date: string;
	image: string;
	imageURL: string;
	tags: string[];
	title: string;
}

interface InnerState {
	feeds: IFeed[];
	hasSearched: boolean;
	loading: boolean;
	searchValue: string;
	tags: string[];
	updateFeeds: boolean;
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
		padding: 2 * theme.spacing.unit,
		transition: '250ms'
	},
	inputContainer: {
		width: '40%',
		minWidth: '350px',
		maxWidth: '100%'
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
		padding: 2 * theme.spacing.unit,
		overflow: 'auto'
	},
	card: {
		margin: 2 * theme.spacing.unit
	}
});

class ImageSearchPageComponent extends React.Component<InnerProps, InnerState> {
	constructor(props: InnerProps) {
		super(props);

		this.state = {
			feeds: [],
			hasSearched: false,
			loading: false,
			searchValue: '',
			tags: [],
			updateFeeds: false
		};
	}

	componentDidUpdate(
		prevProps: InnerProps,
		prevState: InnerState,
		snapshot: any
	) {
		if (this.state.updateFeeds) {
			this.updateFlickrFeedResults();
		}
	}

	updateFlickrFeedResults = async () => {
		const { tags } = this.state;

		this.setState({
			loading: true,
			updateFeeds: false
		});

		try {
			const response = await axios({
				method: 'get',
				baseURL:
					SERVER_URL[(process.env.NODE_ENV as TNode_Env) || 'development'].http,
				params: {
					tags
				}
			});

			const data = JSON.parse(response.data);
			const feeds = data.items.map((feed: any) => {
				const author = /^.*[(]"(.*)"[)]$/.exec(feed.author)[1];
				const title = feed.title.trim() || 'Untitled Feed';

				return {
					author,
					authorURL: `https://www.flickr.com/people/${feed.author_id}`,
					date:
						feed.date_taken || feed.published
							? moment(feed.date_taken || feed.published).format('DD-MMMM-YYYY')
							: 'Date Not Specified',
					image: feed.media.m,
					imageURL: feed.link,
					tags: feed.tags ? feed.tags.split(' ') : [],
					title: title.length < 100 ? title : `${title.substr(0, 100)}...`
				};
			});

			this.setState({ feeds, loading: false });
		} catch (err) {
			this.setState({ loading: false });
		}
	};

	onAddTagHandler = (targetTag: string) => {
		const { tags } = this.state;

		if (!tags.some(tag => tag === targetTag)) {
			this.setState((state: InnerState) => ({
				loading: true,
				tags: deduplicateArray([...state.tags, targetTag]),
				updateFeeds: true
			}));
		}
	};

	onChangeSearchValueHandler = (searchValue: string) =>
		this.setState({ searchValue });

	onRemoveTagHandler = (targetTag: string) => () =>
		this.setState((state: InnerState) => ({
			loading: true,
			tags: state.tags.filter(tag => tag !== targetTag),
			updateFeeds: true
		}));

	onSearchHandler = (value: string) => {
		if (!value) {
			return this.setState({ updateFeeds: true });
		}

		const updatedTags = deduplicateArray([
			...this.state.tags,
			...value.split(' ')
		]);

		this.setState({
			hasSearched: true,
			loading: true,
			searchValue: '',
			tags: updatedTags,
			updateFeeds: true
		});
	};

	render() {
		const { classes } = this.props;
		const { feeds, hasSearched, loading, tags, searchValue } = this.state;

		return (
			<div className={classes.layout}>
				<SlidingWindowPanelLayout
					slideDirection="column"
					windows={[
						{
							column: { index: 0, flexRatio: hasSearched ? undefined : 1 },
							row: { index: 0, flexRatio: 1 },
							children: (
								<div
									className={classes.searchContainer}
									style={
										hasSearched
											? { borderBottom: `1px solid rgba(0,0,0,0.1)` }
											: { borderBottom: `1px solid rgba(0,0,0,0)` }
									}
								>
									<Header as="h1">Flickr Feed Search</Header>

									<Header as="h3">
										Search by tags using the search bar below
									</Header>

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
									{loading
										? new Array(20).fill('').map((value, index) => (
												<div key={index} className={classes.card}>
													<PlaceholderCard />
												</div>
										  ))
										: null}

									{!loading
										? feeds.map(feed => (
												<div key={feed.imageURL} className={classes.card}>
													<ImageCard
														author={feed.author}
														authorURL={feed.authorURL}
														date={feed.date}
														image={feed.image}
														imageURL={feed.imageURL}
														tags={feed.tags}
														title={feed.title}
														onClickTag={this.onAddTagHandler}
													/>
												</div>
										  ))
										: null}
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
