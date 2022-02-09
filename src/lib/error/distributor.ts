import { NextFunction, Request, Response } from 'express';

import { format } from '@/utils/response';

import ServerError from './ServerError';

export default function errorDistributor(
	error: Error | ServerError,
	_req: Request,
	res: Response,
	next: NextFunction,
): void {
	if ('responseStatus' in error) {
		res.status(error.httpStatus);

		// Send error based on status
		if (error.responseStatus === 'error') {
			res.json(format.error(error.message, error.data, error.code));
		} else {
			res.json(format.fail(error.data || {}));
		}

		return next();
	}

	// Send default error
	res.status(500);
	res.json(format.error('An unknown error has occurred'));

	return next();
}
