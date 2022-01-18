import { Router } from 'express';

import ServerError from '@/lib/error/ServerError';

const router = Router();

router.get('/', index);

export default router;

function index(): void {
	throw new ServerError(404, 'fail', '', { record: 'Not found' });
}
