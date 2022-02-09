import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { UnprocessableEntityError } from '@/lib/error';

export default function validationDistributor(
	req: Request,
	_res: Response,
	next: NextFunction,
): void {
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		return next();
	}

	const data = errors.array().reduce(
		(data, error) => ({
			...data,
			[error.param]: error.msg,
		}),
		{},
	);

	return next(new UnprocessableEntityError(data));
}
