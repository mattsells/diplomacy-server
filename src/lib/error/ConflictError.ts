import { DynamicObject } from '@/types/global';

import ServerError from './ServerError';

export default class ConflictError extends ServerError {
	constructor(data: DynamicObject) {
		super(409, 'fail', 'Conflict error', data);
	}
}
