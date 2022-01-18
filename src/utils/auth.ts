import { Express } from 'express';
import jwt from 'jsonwebtoken';

function createJwtToken(user: Express.User): string {
	const JWT_SECRET = process.env.JWT_SECRET || '';
	const body = { id: user.id, email: user.email };
	const token = jwt.sign({ user: body }, JWT_SECRET);

	return token;
}

export { createJwtToken };
