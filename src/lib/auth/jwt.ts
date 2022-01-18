import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

const JWT_SECRET = process.env.JWT_SECRET || '';

export default function apply(): void {
	passport.use(
		new Strategy(
			{
				secretOrKey: JWT_SECRET,
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			},
			async (token, done) => {
				try {
					return done(null, token.user);
				} catch (err) {
					done(err);
				}
			},
		),
	);
}
