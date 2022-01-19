import applyAuthenticationStrategy from './authentication';
import applyRegistrationStrategy from './registration';

export default function applyAuth(): void {
	applyAuthenticationStrategy();
	applyRegistrationStrategy();
}
