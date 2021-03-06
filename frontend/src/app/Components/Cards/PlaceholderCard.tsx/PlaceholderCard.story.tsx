import * as React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { PlaceholderCard } from './PlaceholderCard';

storiesOf('Cards', module).add('Placeholder Card', () => <PlaceholderCard />);
