import axios from 'axios';

describe('/', () => {
	it('Should pass test', async () => {
		const response = await axios({
			method: 'get',
			url: `http://localhost:${process.env.HTTP_PORT || 8880}`
		});

		expect(response.status).toBe(200);
		expect(response.data).not.toBeNull();
		expect(typeof response.data).toBe('object');
		expect(Array.isArray(response.data.items)).toBeTruthy();
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
		expect(typeof response.data).toBe('object');
		expect(Array.isArray(response.data.items)).toBeTruthy();
	});
});
