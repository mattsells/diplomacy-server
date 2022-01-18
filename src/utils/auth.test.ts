import jwt from 'jsonwebtoken';

import { createJwtToken } from './auth';

describe('createJwtToken()', () => {
	const originalEnv = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...originalEnv };
	});

	afterAll(() => {
		process.env = originalEnv;
	});

	it('creates a token with the provided user', () => {
		process.env.JWT_SECRET = 'secret';

		const user = {
			id: 1,
			email: 'user+1@example.com',
		};

		const token = createJwtToken(user);

		const data = jwt.decode(token);

		expect(data).toMatchObject({ user });
	});
});
