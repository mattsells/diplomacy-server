import { DynamicObject } from '@/types/global';

enum ResponseStatus {
	ERROR = 'error',
	FAIL = 'fail',
	SUCCESS = 'success',
}

type SuccessResponse = {
	status: ResponseStatus.SUCCESS;
	data: DynamicObject | null;
};

type FailResponse = {
	status: ResponseStatus.FAIL;
	data: DynamicObject | null;
};

type ErrorResponse = {
	code?: number;
	status: ResponseStatus.ERROR;
	message: string;
	data?: DynamicObject | null;
};

function success<T extends DynamicObject = DynamicObject>(
	data: T,
): SuccessResponse {
	return {
		status: ResponseStatus.SUCCESS,
		data,
	};
}

function fail<T extends DynamicObject = DynamicObject>(data: T): FailResponse {
	return {
		status: ResponseStatus.FAIL,
		data,
	};
}

export { fail, success };
