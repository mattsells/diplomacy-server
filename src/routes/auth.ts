import { Request, Response, Router } from 'express';
import passport from 'passport';

import { formatSuccess } from '@/utils/response';

const router = Router();

router.post('/sign_in', passport.authenticate('signIn'), signIn);

export default router;

function signIn(req: Request, res: Response): void {
	res.json(formatSuccess({ user: req.user || null }));
}
