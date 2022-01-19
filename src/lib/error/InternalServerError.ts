import ServerError from './ServerError';

export default class InternalServerError extends ServerError {
	constructor(message = 'An unknown error occurred') {
		super(500, 'error', message);
	}
}
