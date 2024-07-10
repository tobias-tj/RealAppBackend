import express from 'express';
import { getAll, create } from '../controllers/sales';
import { validateUser } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validateRequest';
import { SaleCreationScema } from '../schemas/sales';

const router = express.Router();

router.use(validateUser())

router.get("/", getAll);
router.post("/", validateRequest(SaleCreationScema), create);

export default router;
