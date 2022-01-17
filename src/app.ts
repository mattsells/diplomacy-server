import express from 'express';
import morgan from 'morgan';

import routes from './routes';

const app = express();

// Logging
app.use(morgan('common'));

// Routes
app.use('/v1', routes);

export default app;
