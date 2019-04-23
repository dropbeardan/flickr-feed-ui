import axios from 'axios';

describe('/', () => {
	it('Should pass test', async () => {
		const response = await axios({
			method: 'get',
			url: `http://localhost:${process.env.HTTP_PORT || 8880}`
		});

		expect(response.status).toBe(200);
		expect(response.data).not.toBeNull();
		expect(typeof response.data).toBe('string');
		expect(() => JSON.parse(response.data)).not.toThrow();

		const responseData = JSON.parse(response.data);

		expect(Array.isArray(responseData.items)).toBeTruthy();
	});
});

describe('/:tags', () => {
	it('Should pass test', async () => {
		const response = await axios({
			method: 'get',
			url: `http://localhost:${process.env.HTTP_PORT || 8880}`,
			params: {
				tags: ['dogs', 'cats']
			}
		});

		expect(response.status).toBe(200);
		expect(response.data).not.toBeNull();
		expect(typeof response.data).toBe('string');
		expect(() => JSON.parse(response.data)).not.toThrow();

		const responseData = JSON.parse(response.data);

		expect(Array.isArray(responseData.items)).toBeTruthy();
	});
});
