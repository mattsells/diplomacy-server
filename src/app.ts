import express from 'express';
import morgan from 'morgan';
import passport from 'passport';

import applyAuth from '@/lib/auth';
import errorDistributor from '@/lib/error/distributor';
import routes from '@/routes';

const app = express();

// Configure authentication strategies
applyAuth();

// Logging
app.use(morgan('common'));

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load authentication strategies
app.use(passport.initialize());

// Routes
app.use('/v1', routes);

// Error fallback
app.use(errorDistributor);

export default app;
