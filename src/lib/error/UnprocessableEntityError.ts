import { DynamicObject } from '@/types/global';

import ServerError from './ServerError';

export default class UnprocessableEntityError extends ServerError {
	constructor(data: DynamicObject) {
		super(422, 'fail', 'Unprocessable entity', data);
	}
}
