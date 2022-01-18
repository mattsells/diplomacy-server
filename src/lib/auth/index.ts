import applySignIn from './signIn';
import applySignUp from './signUp';

export default function applyAuth(): void {
	applySignIn();
	applySignUp();
}
