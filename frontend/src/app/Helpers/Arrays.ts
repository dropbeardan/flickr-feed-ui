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

/**
 * Performs a shallow comparison between two arrays to determine if the contents of both Arrays match.
 *
 * @param arr1 First array to compare.
 * @param arr2 Second array to compare.
 */
export const isEqualArray = <T>(arr1: T[], arr2: T[]) =>
	arr1.length === arr2.length &&
	arr1.every(elem1 => arr2.some(elem2 => elem1 === elem2));
