import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TagChip } from './TagChip';

storiesOf('Chips', module).add('Tag Chip', () => (
	<TagChip
		label="Tag Chip"
		onClick={action('onClick')}
		onClose={action('onClose')}
	/>
));
