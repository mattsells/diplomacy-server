import express from 'express';
import morgan from 'morgan';

function startServer(): void {
	const app = express();

	app.use(morgan('common'));

	app.get('/health', (req, res) => {
		res.send({ success: true });
	});

	app.listen(3000, () => {
		console.log('App started on port 3000');
	});
}

export { startServer };
