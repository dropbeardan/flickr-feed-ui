import * as React from 'react';

import withStyles from 'react-jss';

import { Input } from 'semantic-ui-react';

import {
	Promisable,
	NoResponse,
	JSSTheme,
	JSSThemeContext
} from '../../../Typings';

interface OuterProps {
	/**
	 * Error message.
	 *
	 * @note Empty or undefined indicates no error.
	 */
	error?: string;

	/**
	 * Additional props passed to the Input component.
	 */
	inputProps?: {
		[K: string]: any;
	};
	label?: string;
	loading?: boolean;
	placeholder?: string;

	/**
	 * Custom ref to idetify element.
	 *
	 * @note Use the ref sparingly.
	 * @note Handy for manually managing focus.
	 */
	ref?: React.RefObject<any>;
	value?: string;
	onBlur?: (value: string) => Promisable<NoResponse>;
	onChange?: (value: string) => Promisable<NoResponse>;
	onFocus?: (value: string) => Promisable<NoResponse>;
	onSubmit?: (value: string) => Promisable<NoResponse>;

	/**
	 * Event handler for capturing Tab navigation.
	 *
	 * @note Captures both directions - forward (next field): TAB; reverse (previous field): SHIFT + TAB.
	 */
	onTabNavigation?: (
		direction: 'forward' | 'reverse',
		value: string,
		event: React.KeyboardEvent<HTMLInputElement>
	) => Promisable<NoResponse>;
}

interface InnerProps
	extends OuterProps,
		JSSThemeContext<ReturnType<typeof styles>> {}

interface InnerState {
	value: string;
}

const styles = (theme: JSSTheme) => ({
	inputContainer: {
		display: 'flex',
		flexDirection: 'column',
		'&:focus-within $inputLabel': {
			fontWeight: 'bold',
			color: (props: InnerProps) =>
				props.error ? theme.palette.error.dark : theme.palette.primary.dark
		},
		'&:focus-within $inputError': {
			color: theme.palette.error.dark
		}
	},
	inputLabel: {
		color: (props: InnerProps) =>
			props.error ? theme.palette.error.normal : theme.palette.primary.normal,
		marginBottom: 0.5 * theme.spacing.unit,
		marginLeft: 0.5 * theme.spacing.unit
	},
	input: {},
	inputError: {
		color: theme.palette.error.normal,
		marginTop: 0.25 * theme.spacing.unit,
		marginLeft: 0.5 * theme.spacing.unit
	}
});

class BasicInputComponent extends React.Component<InnerProps, InnerState> {
	constructor(props: InnerProps) {
		super(props);

		this.state = {
			value: props.value || ''
		};
	}

	componentDidUpdate() {
		if (
			typeof this.props.value === 'string' &&
			this.state.value !== this.props.value
		) {
			this.setState({ value: this.props.value });
		}
	}

	onBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
		const { onBlur } = this.props;

		if (onBlur) {
			return onBlur(this.state.value);
		}
	};

	onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { onChange } = this.props;

		this.setState({ value: event.target.value });

		if (onChange) {
			return onChange(event.target.value);
		}
	};

	onFocusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
		const { onFocus } = this.props;

		if (onFocus) {
			return onFocus(this.state.value);
		}
	};

	onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		const { onSubmit, onTabNavigation } = this.props;

		// TAB
		if (onTabNavigation && !event.shiftKey && event.key === 'Tab') {
			return onTabNavigation('forward', this.state.value, event);
		}

		// SHIFT + TAB
		if (onTabNavigation && event.shiftKey && event.key === 'Tab') {
			return onTabNavigation('reverse', this.state.value, event);
		}

		// ENTER
		if (onSubmit && event.key === 'Enter') {
			return onSubmit(this.state.value);
		}
	};

	render() {
		const {
			classes,
			error,
			inputProps,
			label,
			loading,
			placeholder,
			ref
		} = this.props;
		const { value } = this.state;

		return (
			<div className={classes.inputContainer}>
				{label ? <span className={classes.inputLabel}>{label}</span> : null}
				<Input
					ref={ref}
					className={classes.input}
					error={Boolean(error)}
					loading={loading}
					placeholder={placeholder}
					onBlur={this.onBlurHandler}
					onChange={this.onChangeHandler}
					onFocus={this.onFocusHandler}
					onKeyDown={this.onKeyDownHandler}
					value={value}
					{...inputProps || {}}
				/>
				{error ? <span className={classes.inputError}>{error}</span> : null}
			</div>
		);
	}
}

export const BasicInput = withStyles(styles)(BasicInputComponent);
