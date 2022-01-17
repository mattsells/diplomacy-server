import { PrismaClient } from '@prisma/client';
import express from 'express';
import morgan from 'morgan';

async function startServer(): Promise<void> {
	const app = express();

	const db = new PrismaClient();

	const users = await db.user.findMany();

	app.use(morgan('common'));

	app.get('/health', (_req, res) => {
		res.send({ success: true, users });
	});

	app.listen(3000, () => {
		console.log('App started on port 3000');
	});
}

export { startServer };
