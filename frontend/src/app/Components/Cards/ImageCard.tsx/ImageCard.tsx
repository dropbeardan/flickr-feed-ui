import * as React from 'react';

import withStyles from 'react-jss';

import { Card, Header, Image } from 'semantic-ui-react';

import { TagChip } from '../../Chips';

import {
	JSSTheme,
	JSSThemeContext,
	NoResponse,
	Promisable
} from '../../../Typings';

interface OuterProps {
	author: string;
	authorURL: string;
	date: string;
	image: string;
	imageURL: string;
	tags: string[];
	title: string;
	onClickTag?: (tag: string) => Promisable<NoResponse>;
}

interface InnerProps
	extends OuterProps,
		JSSThemeContext<ReturnType<typeof styles>> {}

interface InnerState {}

const styles = (theme: JSSTheme) => ({
	imageContainer: {
		position: 'relative',
		display: 'flex',
		height: '100%',
		width: '100%',
		'&:hover $imageOverlay': {
			background: 'rgba(0,0,0,0.5)',
			'& > *': {
				opacity: '1'
			}
		}
	},
	image: {
		display: 'flex !important',
		width: '100%',
		'& > img': {
			objectFit: 'cover',
			width: '100%'
		}
	},
	imageOverlay: {
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
		width: '100%',
		background: 'rgba(0,0,0,0)',
		transition: '250ms',
		'& > *': {
			color: 'white !important',
			opacity: '0',
			transition: '250ms'
		}
	},
	description: {
		padding: `${0.5 * theme.spacing.unit}px ${2 * theme.spacing.unit}px`
	},
	tagContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		height: '80px',
		overflow: 'auto',
		'& > *': {
			margin: 0.5 * theme.spacing.unit
		}
	}
});

class ImageCardComponent extends React.Component<InnerProps, InnerState> {
	onClickTagHandler = (tag: string) => () => {
		const { onClickTag } = this.props;

		if (onClickTag) {
			onClickTag(tag);
		}
	};

	render() {
		const {
			author,
			authorURL,
			classes,
			date,
			image,
			imageURL,
			tags,
			title
		} = this.props;

		return (
			<Card>
				<a className={classes.imageContainer} href={imageURL} target="_blank">
					<Image className={classes.image} src={image} />
					<div className={classes.imageOverlay}>
						<Header as="h2">View Original</Header>
					</div>
				</a>
				<Card.Content>
					<Card.Header as="a" href={imageURL} target="_blank">
						{title}
					</Card.Header>
					<Card.Meta>
						<a href={authorURL} target="_blank">
							{author}
						</a>
					</Card.Meta>
				</Card.Content>
				<Card.Description>
					<div className={classes.description}>{date}</div>
				</Card.Description>
				<Card.Content extra>
					<div className={classes.tagContainer}>
						{tags.map((tag, index) => (
							<TagChip
								key={`${tag}-${index}`}
								label={tag}
								onClick={this.onClickTagHandler(tag)}
							/>
						))}
					</div>
				</Card.Content>
			</Card>
		);
	}
}

export const ImageCard = withStyles(styles)(ImageCardComponent);
