import { Router } from 'express';
import passport from 'passport';

import auth from './auth';
import health from './health';
import error from './error';

const router = Router();

// Authentication
router.use(auth);

// Health check
router.use('/health', health);
router.use('/error', error);

// Protected routes
// router.use('/v1', passport.authenticate('jwt', { session: false }), router.v1);

export default router;
