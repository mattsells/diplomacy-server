import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';

import db from '@/db';

export default function apply(): void {
	passport.use(
		'sign-up',
		new Strategy(
			{
				usernameField: 'user[email]',
				passwordField: 'user[password]',
				session: false,
			},
			async (email, password, done) => {
				try {
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
