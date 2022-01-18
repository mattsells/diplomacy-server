import { DynamicObject } from '@/types/global';

export type ResponseStatus = 'error' | 'fail' | 'success';

type SuccessResponse = {
	status: 'success';
	data: DynamicObject | null;
};

type FailResponse = {
	status: 'fail';
	data: DynamicObject | null;
};

type ErrorResponse = {
	code?: number;
	status: 'error';
	message: string;
	data?: DynamicObject | null;
};

function success<T extends DynamicObject = DynamicObject>(
	data: T,
): SuccessResponse {
	return {
		status: 'success',
		data,
	};
}

function fail<T extends DynamicObject = DynamicObject>(data: T): FailResponse {
	return {
		status: 'fail',
		data,
	};
}

function error<T extends DynamicObject | null = null>(
	message: string,
	data?: T,
	code?: number,
): ErrorResponse {
	return {
		status: 'error',
		message,
		...(typeof data === 'object' && { data }),
		...(typeof code === 'number' && { code }),
	};
}

const format = { error, fail, success };

export { format };
