import { DynamicObject } from '@/types/global';

import ServerError from './ServerError';

export default class UnauthorizedError extends ServerError {
	constructor(data: DynamicObject) {
		super(401, 'fail', 'Unauthorized', data);
	}
}
