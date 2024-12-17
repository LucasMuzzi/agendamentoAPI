// routes/registerRoute.ts
import { Router } from "express";
import { ClientController } from "../controllers/clientController";

const router = Router();
const clientController = new ClientController();

router.post("/register-client", clientController.registerClient);
router.post("/get-clients", clientController.getClientsByCodUser);
router.post("/update-client/:id", clientController.updateClient);
router.post("/delete-client/:id", clientController.deleteClient);

export default router;
