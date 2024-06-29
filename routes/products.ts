import express from 'express';
import { validateUser } from '../middlewares/auth';
import { getByCode } from '../controllers/product';

const router = express.Router();

router.use(validateUser())

router.get("/:code", getByCode);

export default router;
