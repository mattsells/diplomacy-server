import { Request, Response, Router } from 'express';
import passport from 'passport';

import { success } from '@/utils/response';

const router = Router();

router.post(
	'/sign_up',
	passport.authenticate('sign-up', { session: false }),
	signUp,
);

router.post(
	'/sign_in',
	passport.authenticate('sign-in', { session: false }),
	signIn,
);

export default router;

function signUp(req: Request, res: Response): void {
	res.json(success({ user: req.user || null }));
}

function signIn(req: Request, res: Response): void {
	res.json(success({ user: req.user || null }));
}
