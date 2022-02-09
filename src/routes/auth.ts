import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import passport from 'passport';

import { InternalServerError, UnauthorizedError } from '@/lib/error';
import validateRequest from '@/lib/validation/distributor';
import { assertIsUser } from '@/models/user';
import { createJwtToken } from '@/utils/auth';
import { removeProperties } from '@/utils/data';
import { format } from '@/utils/response';

const router = Router();

router.post(
	'/registrations',
	body('user.email').isEmail().withMessage('Not a valid email address'),
	body('user.password')
		.isLength({ min: 6 })
		.custom((value, { req }) => {
			if (value !== req.body.user.confirmPassword) {
				throw new Error('Does not match confirmation');
			}

			return true;
		}),
	validateRequest,
	(req, res, next) => {
		passport.authenticate('registration', (err, user) => {
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
	'/sessions',
	// TODO: Use i18n for messages; centralize error message store
	body('user.email').isEmail().withMessage('Not a valid email address'),
	// TODO: Maybe move this all to a single helper
	validateRequest,
	(req, res, next) => {
		passport.authenticate('authentication', (err, user) => {
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

	assertIsUser(user);

	const token = createJwtToken(user);

	res.json(
		format.success({
			token,
			user: removeProperties(user, 'encryptedPassword'),
		}),
	);
}
