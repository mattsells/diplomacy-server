import { Router } from 'express';

import auth from './auth';
import error from './error';
import health from './health';

const router = Router();

// Authentication
router.use(auth);

// Health check
router.use('/health', health);
router.use('/error', error);

// Protected routes

export default router;
