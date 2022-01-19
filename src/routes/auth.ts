import { Request, Response, Router } from 'express';
import passport from 'passport';

import { createJwtToken } from '@/utils/auth';
import { format } from '@/utils/response';
import ServerError from '@/lib/error/ServerError';

const router = Router();

router.post(
	'/sign_up',
	(req, res, next) => {
		passport.authenticate('sign-up', (err, user) => {
			if (err) {
				return next(new ServerError(500, 'error', err.message));
			}

			req.logIn(user, { session: false }, (err) => {
				if (err) {
					next(err);
				}

				next();
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
				return next(new ServerError(500, 'error', err.message));
			}

			if (!user) {
				return next(
					new ServerError(401, 'fail', 'User not found', {
						user: 'Invalid email or password',
					}),
				);
			}

			req.logIn(user, { session: false }, (err) => {
				if (err) {
					next(err);
				}

				next();
			});
		})(req, res, next);
	},
	respondWithToken,
);

export default router;

function respondWithToken({ user }: Request, res: Response): void {
	if (!user) {
		throw new Error('No user present in request');
	}

	const token = createJwtToken(user);
	res.json(format.success({ token, user }));
}
