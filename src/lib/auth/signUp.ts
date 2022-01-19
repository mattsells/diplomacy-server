import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';

import db from '@/db';
import { ConflictError } from '@/lib/error';

export default function apply(): void {
	passport.use(
		'sign-up',
		new Strategy(
			{
				usernameField: 'user[email]',
				passwordField: 'user[password]',
			},
			async (email, password, done) => {
				try {
					const userWithEmail = await db.user.findUnique({
						where: {
							email,
						},
					});

					if (userWithEmail) {
						return done(
							new ConflictError({
								email: 'Email address already in use',
							}),
						);
					}

					const encryptedPassword = await bcrypt.hash(password, 10);

					const user = await db.user.create({
						data: {
							email,
							encryptedPassword,
						},
					});

					done(null, user);
				} catch (err) {
					done(err);
				}
			},
		),
	);
}
