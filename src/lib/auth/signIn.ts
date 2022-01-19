import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';

import db from '@/db';

export default function apply(): void {
	passport.use(
		'sign-in',
		new Strategy(
			{
				usernameField: 'user[email]',
				passwordField: 'user[password]',
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
}
