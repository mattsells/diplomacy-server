import { Request, Response, Router } from 'express';
import passport from 'passport';

import { InternalServerError, UnauthorizedError } from '@/lib/error';
import { createJwtToken } from '@/utils/auth';
import { format } from '@/utils/response';

const router = Router();

router.post(
	'/sign_up',
	(req, res, next) => {
		passport.authenticate('sign-up', (err, user) => {
			if (err) {
				return next(err);
			}

			req.logIn(user, { session: false }, (err) => {
				return err ? next(err) : next();
			});
		})(req, res, next);
	},
	respondWithToken,
);

router.post(
	'/sign_in',
	(req, res, next) => {
		passport.authenticate('sign-in', (err, user) => {
			if (err) {
				return next(err);
			}

			if (!user) {
				return next(
					new UnauthorizedError({
						user: 'Invalid email or password',
					}),
				);
			}

			req.logIn(user, { session: false }, (err) => {
				return err ? next(err) : next();
			});
		})(req, res, next);
	},
	respondWithToken,
);

export default router;

function respondWithToken({ user }: Request, res: Response): void {
	if (!user) {
		throw new InternalServerError('No user present in request');
	}

	const token = createJwtToken(user);
	res.json(format.success({ token, user }));
}
