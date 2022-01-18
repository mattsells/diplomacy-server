import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';

import db from '@/db';

passport.use(
	'signIn',
	new Strategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (email, password, done) => {
			try {
				const user = await db.user.findUnique({
					where: { email },
				});

				if (!user) {
					return done(null, false);
				}

				const isPasswordValid = await bcrypt.compare(
					password,
					user.encryptedPassword,
				);

				if (!isPasswordValid) {
					return done(null, false);
				}

				return done(null, user);
			} catch (err) {
				done(err);
			}
		},
	),
);
