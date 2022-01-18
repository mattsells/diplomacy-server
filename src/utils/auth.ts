import { Express } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '';

function createJwtToken(user: Express.User): string {
	const body = { id: user.id, email: user.email };
	const token = jwt.sign({ user: body }, JWT_SECRET);

	return token;
}

export { createJwtToken };
