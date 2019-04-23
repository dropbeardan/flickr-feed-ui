import { deduplicateArray } from '../Arrays';

describe('deduplicateArray', () => {
	const runTest = (testCases: { input: any[]; output: any[] }[]) =>
		testCases.forEach(testCase =>
			expect(deduplicateArray(testCase.input)).toEqual(testCase.output)
		);

	it('Should return the original values if there are no duplicates.', () => {
		const testCases = [
			{ input: [], output: [] },
			{ input: ['a'], output: ['a'] },
			{ input: [1], output: [1] },
			{ input: [undefined], output: [undefined] },
			{ input: [null], output: [null] },
			{ input: [false], output: [false] },
			{ input: [true], output: [true] },
			{ input: ['a', 'b'], output: ['a', 'b'] },
			{ input: [1, 2], output: [1, 2] },
			{ input: [true, false], output: [true, false] }
		];

		runTest(testCases);
	});

	it('Should not consider the same value of different types as equal', () => {
		const testCases = [
			{ input: [1, '1'], output: [1, '1'] },
			{ input: [true, 1], output: [true, 1] },
			{
				input: [undefined, null, 0, false],
				output: [undefined, null, 0, false]
			}
		];

		runTest(testCases);
	});

	it('Should retain the first occuring value and remove duplicates if present.', () => {
		const testCases = [
			{ input: ['a', 'a'], output: ['a'] },
			{ input: [1, 1], output: [1] },
			{ input: [undefined, undefined], output: [undefined] },
			{ input: [null, null], output: [null] },
			{ input: [false, false], output: [false] },
			{ input: [true, true], output: [true] },
			{ input: ['a', 'b', 'a'], output: ['a', 'b'] },
			{ input: [1, 2, 1], output: [1, 2] },
			{ input: [true, false, true], output: [true, false] }
		];

		runTest(testCases);
	});
});
