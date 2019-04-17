import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MockingWhale from './MockingWhale';

storiesOf('MockingWhale', module)
	.add('Invisible', () => (
		<MockingWhale
			say={"BOO... You can't see me!"}
			hidden
			onClick={action('onClick')}
		/>
	))
	.add('Visible', () => (
		<MockingWhale say="Oh no, you found me :(" onClick={action('onClick')} />
	));
