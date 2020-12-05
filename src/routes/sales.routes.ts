import { Router } from 'express';

const SalesRouter = Router();

SalesRouter.post('/', async (req, res) => {
  const a = 'a';
  return res.json({ ok: true });
});

export default SalesRouter;
