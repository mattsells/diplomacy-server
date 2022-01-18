import { Router } from 'express';
import passport from 'passport';

import auth from './auth';
import health from './health';

const router = Router();

// Unprotected routes
router.use(auth);
router.use('/health', health);

// Protected routes
// router.use('/v1', passport.authenticate('jwt', { session: false }), router.v1);

export default router;
