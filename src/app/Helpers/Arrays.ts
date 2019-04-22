/**
 * Removes duplicate entries from an array.
 *
 * @param arr Array to inspect.
 *
 * @note Array elements are compared by shallow equality.
 * @note When a duplicate entry is found, the entry with the lower index is retained.
 */
export const deduplicateArray = <T>(arr: T[]): T[] =>
	arr
		.reverse()
		.filter((value, index) => arr.lastIndexOf(value) === index)
		.reverse();
