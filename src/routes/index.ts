import { Router } from 'express';

import auth from './auth';
import health from './health';

const router = Router();

// Unprotected routes
router.use(auth);
router.use('/health', health);

// Protected routes

export default router;
