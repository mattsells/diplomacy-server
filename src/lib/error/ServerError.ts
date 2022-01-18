import { DynamicObject } from '@/types/global';
import { ResponseStatus } from '@/utils/response';

export default class ServerError extends Error {
	constructor(
		public httpStatus: number = 500,
		public responseStatus: Extract<ResponseStatus, 'fail' | 'error'> = 'fail',
		public message: string = '',
		public data?: DynamicObject | null,
		public code?: number,
	) {
		super(message);
	}
}
