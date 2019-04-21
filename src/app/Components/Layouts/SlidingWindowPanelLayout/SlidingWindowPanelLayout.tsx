import * as React from 'react';

import withStyles from 'react-jss';

import { JSSTheme, JSSThemeContext } from '../../../Typings';

interface IColumn {
	/**
	 * Index of the column.
	 *
	 * @note If there are multiple windows with the same row and column index, the first one will be rendered.
	 *
	 * @example Index: 3 will be positioned on the 3rd column.
	 */
	index: number;

	/**
	 * Flex ratio of the height of the window.
	 *
	 * @note If the slideDirection is set to "row", the first flexRatio for the column will be applied to all of the children windows.
	 *
	 * @example FlexRatios: [1, 1] results in Heights: [25%, 25%].
	 * @example FlexRatios: [1, 2, 1] results in Heights: [25%, 50%, 25%].
	 */
	flexRatio?: number;
}

interface IRow {
	/**
	 * Index of the row.
	 * @note If there are multiple windows with the same row and column index, the first one will be rendered.
	 * @example Index: 3 will be positioned on the 3rd row.
	 */
	index: number;

	/**
	 * Flex ratio of width of the window.
	 *
	 * @note If the slideDirection is set to "column", the first flexRatio for the row will be applied to all of the children windows.
	 *
	 * @example FlexRatios: [1, 1] results in Widths: [25%, 25%].
	 * @example FlexRatios: [1, 2, 1] results in Widths: [25%, 50%, 25%].
	 */
	flexRatio?: number;
}

interface IWindow {
	row: IRow;
	column: IColumn;

	/**
	 * Content of Window.
	 */
	children?: React.ReactNode;

	/**
	 * Visibility of window. Default: True.
	 * @note Changing visibility is affected by transition.
	 */
	isVisible?: boolean;
}

interface OuterProps {
	windows: IWindow[];

	/**
	 * Direction of panel sliding. Default "row".
	 */
	slideDirection?: 'column' | 'row';

	/**
	 * The period of time for animation transitions. Default: 250ms.
	 */
	transition?: number;
}

interface InnerProps
	extends OuterProps,
		JSSThemeContext<ReturnType<typeof styles>> {}

interface InnerState {}

const styles = (theme: JSSTheme) => ({
	layout: {
		display: 'flex',
		flexDirection: (props: InnerProps) =>
			props.slideDirection === 'column' ? 'row' : 'column',
		flexWrap: 'wrap',
		width: '100%',
		height: '100%'
	},
	column: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%'
	},
	row: {
		display: 'flex',
		width: '100%'
	},
	window: {
		transition: (props: InnerProps) =>
			`${props.transition || props.transition === 0 ? props.transition : 250}ms`
	}
});

class SlidingWindowPanelLayoutComponent extends React.Component<
	InnerProps,
	InnerState
> {
	getLastColumnIndex = () =>
		(this.props.windows || []).reduce(
			(count, nextWindow) =>
				nextWindow.column.index > count ? nextWindow.column.index : count,
			0
		);

	getLastRowIndex = () =>
		(this.props.windows || []).reduce(
			(count, nextWindow) =>
				nextWindow.row.index > count ? nextWindow.row.index : count,
			0
		);

	render() {
		const { classes, slideDirection, windows } = this.props;

		const columnCount = this.getLastColumnIndex() + 1;
		const rowCount = this.getLastRowIndex() + 1;

		return (
			<div className={classes.layout}>
				{!slideDirection || slideDirection === 'row'
					? new Array(rowCount).fill('').map((rowValue, rowIndex) => {
							const targetRowWindow = windows.find(
								window => window.row.index === rowIndex
							);

							return (
								<div
									key={`row-${rowIndex}`}
									className={classes.row}
									style={{
										flex: targetRowWindow ? targetRowWindow.column.flexRatio : 0
									}}
								>
									{new Array(columnCount)
										.fill('')
										.map((columnValue, columnIndex) => {
											const targetWindow = windows.find(
												window =>
													window.column.index === columnIndex &&
													window.row.index === rowIndex
											);

											return (
												<div
													key={`row-${columnIndex},${rowIndex}`}
													className={classes.window}
													style={{
														flex: targetWindow.row.flexRatio,
														opacity: targetWindow.isVisible === false ? 0 : 1
													}}
												>
													{targetWindow ? targetWindow.children : null}
												</div>
											);
										})}
								</div>
							);
					  })
					: null}

				{slideDirection === 'column'
					? new Array(columnCount).fill('').map((columnValue, columnIndex) => {
							const targetColumnWindow = windows.find(
								window => window.column.index === columnIndex
							);

							return (
								<div
									key={`column-${columnIndex}`}
									className={classes.column}
									style={{
										flex: targetColumnWindow
											? targetColumnWindow.row.flexRatio
											: 0
									}}
								>
									{new Array(rowCount).fill('').map((rowValue, rowIndex) => {
										const targetWindow = windows.find(
											window =>
												window.column.index === columnIndex &&
												window.row.index === rowIndex
										);

										return (
											<div
												key={`column-${columnIndex},${rowIndex}`}
												className={classes.window}
												style={{
													flex: targetWindow.column.flexRatio,
													opacity: targetWindow.isVisible === false ? 0 : 1
												}}
											>
												{targetWindow ? targetWindow.children : null}
											</div>
										);
									})}
								</div>
							);
					  })
					: null}
			</div>
		);
	}
}

export const SlidingWindowPanelLayout = withStyles(styles)(
	SlidingWindowPanelLayoutComponent
);
