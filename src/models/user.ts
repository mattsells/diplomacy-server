import { User } from '@prisma/client';

function assertIsUser(user: unknown): asserts user is User {
	if (!isUser(user)) {
		throw new Error('Object is not of type `User`');
	}
}

function isUser(user: any): user is User {
	return (
		!!user &&
		typeof user === 'object' &&
		'id' in user &&
		typeof user['id'] === 'number' &&
		'email' in user &&
		typeof user['email'] === 'string' &&
		'encryptedPassword' in user &&
		typeof user['encryptedPassword'] === 'string'
	);
}

export { assertIsUser, isUser };
