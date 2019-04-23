import { isEqualArray } from '../Arrays';

describe('isEqualArray', () => {
	interface ITestCase<T> {
		input: {
			arr1: T[];
			arr2: T[];
		};
		output: boolean;
	}

	const runTest = (testCases: ITestCase<any>[]) =>
		testCases.forEach(testCase =>
			expect(isEqualArray(testCase.input.arr1, testCase.input.arr2)).toBe(
				testCase.output
			)
		);

	it('Should return TRUE if the two arrays contain the same elements.', () => {
		const testCases: ITestCase<any>[] = [
			{ input: { arr1: [], arr2: [] }, output: true },
			{ input: { arr1: [0], arr2: [0] }, output: true },
			{ input: { arr1: ['a'], arr2: ['a'] }, output: true },
			{ input: { arr1: [undefined], arr2: [undefined] }, output: true },
			{ input: { arr1: [null], arr2: [null] }, output: true },
			{ input: { arr1: [0, 1], arr2: [0, 1] }, output: true },
			{ input: { arr1: ['a', 'b'], arr2: ['a', 'b'] }, output: true },
			{
				input: { arr1: [null, undefined], arr2: [null, undefined] },
				output: true
			}
		];

		runTest(testCases);
	});

	it('Should disregard element order as part of equality check.', () => {
		const testCases: ITestCase<any>[] = [
			{ input: { arr1: [0, 1], arr2: [1, 0] }, output: true },
			{ input: { arr1: ['a', 'b'], arr2: ['b', 'a'] }, output: true },
			{
				input: { arr1: [null, undefined], arr2: [undefined, null] },
				output: true
			}
		];

		runTest(testCases);
	});

	it('Should return FALSE if the two arrays do not contain the same elements.', () => {
		const testCases: ITestCase<any>[] = [
			{ input: { arr1: [], arr2: [1] }, output: false },
			{ input: { arr1: [1], arr2: [] }, output: false },
			{ input: { arr1: ['a'], arr2: ['b'] }, output: false },
			{ input: { arr1: ['a'], arr2: ['a', 'b'] }, output: false },
			{ input: { arr1: ['a', 'b'], arr2: ['a'] }, output: false },
			{ input: { arr1: [null], arr2: [] }, output: false },
			{ input: { arr1: [0], arr2: [] }, output: false },
			{ input: { arr1: [false], arr2: [] }, output: false },
			{ input: { arr1: [undefined], arr2: [] }, output: false },
			{ input: { arr1: [''], arr2: [] }, output: false },
			{ input: { arr1: [null], arr2: [0] }, output: false },
			{ input: { arr1: [null], arr2: [false] }, output: false },
			{ input: { arr1: [null], arr2: [undefined] }, output: false },
			{ input: { arr1: [null], arr2: [''] }, output: false },
			{ input: { arr1: [0], arr2: [null] }, output: false },
			{ input: { arr1: [0], arr2: [false] }, output: false },
			{ input: { arr1: [0], arr2: [undefined] }, output: false },
			{ input: { arr1: [0], arr2: [''] }, output: false },
			{ input: { arr1: [false], arr2: [null] }, output: false },
			{ input: { arr1: [false], arr2: [0] }, output: false },
			{ input: { arr1: [false], arr2: [undefined] }, output: false },
			{ input: { arr1: [false], arr2: [''] }, output: false },
			{ input: { arr1: [undefined], arr2: [null] }, output: false },
			{ input: { arr1: [undefined], arr2: [0] }, output: false },
			{ input: { arr1: [undefined], arr2: [false] }, output: false },
			{ input: { arr1: [undefined], arr2: [''] }, output: false },
			{ input: { arr1: [''], arr2: [null] }, output: false },
			{ input: { arr1: [''], arr2: [0] }, output: false },
			{ input: { arr1: [''], arr2: [false] }, output: false },
			{ input: { arr1: [''], arr2: [undefined] }, output: false },
			{ input: { arr1: [true], arr2: [1] }, output: false },
			{ input: { arr1: [1], arr2: [true] }, output: false }
		];

		runTest(testCases);
	});
});
