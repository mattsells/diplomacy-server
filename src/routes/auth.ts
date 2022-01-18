import { Request, Response, Router } from 'express';
import passport from 'passport';

import { createJwtToken } from '@/utils/auth';
import { format } from '@/utils/response';

const router = Router();

router.post(
	'/sign_up',
	passport.authenticate('sign-up', { session: false }),
	respondWithToken,
);

router.post(
	'/sign_in',
	passport.authenticate('sign-in', { session: false }),
	respondWithToken,
);

export default router;

function respondWithToken(req: Request, res: Response): void {
	if (!req.user) {
		throw new Error('No user present in request');
	}

	const token = createJwtToken(req.user);
	res.json(format.success({ token, user: req.user }));
}
