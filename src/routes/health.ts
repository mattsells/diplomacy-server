import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', index);

export default router;

function index(_req: Request, res: Response): void {
	res.json({ status: 'success', data: null });
}
