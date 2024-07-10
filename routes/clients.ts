import express from 'express';
import { getAll, create, getById, update, getByDocument } from '../controllers/clients';
import { validateUser } from '../middlewares/auth';
import { validateRequest } from '../middlewares/validateRequest';
import { ClientCreationScema, ClientEditionScema } from '../schemas/clients';

const router = express.Router();

router.use(validateUser())


router.get("/", getAll);
router.get("/:id", getById);
router.get("/document/:document", getByDocument);
router.post("/", validateRequest(ClientCreationScema), create)
router.put("/:id", validateRequest(ClientEditionScema) ,update);


export default router;
