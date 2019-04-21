import * as React from 'react';

import * as moment from 'moment';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ImageCard } from './ImageCard';

storiesOf('Cards', module).add('Image Card', () => (
	<ImageCard
		date={moment('2019-04-20T21:45:48Z').format('DD-MMMM-YYYY')}
		author="Nad"
		authorURL="https://www.flickr.com/photos/nad/"
		image="https://live.staticflickr.com/65535/33776493008_6d8d201e5b_m.jpg"
		imageURL="https://www.flickr.com/photos/nad/33776493008/"
		tags={[
			'animal',
			'garden',
			'plants',
			'shoes',
			'window',
			'england',
			'london',
			'fox',
			'dog'
		]}
		title="Foxy"
		onClickTag={action('onClickTag')}
	/>
));
