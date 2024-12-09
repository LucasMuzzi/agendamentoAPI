// registerRoute.ts
import { Router } from "express";
import {
  deleteClient,
  getClientsByCodUser,
  registerClient,
  updateClient,
} from "../controllers/clientController";

const router = Router();

router.post("/register-client", registerClient);
router.post("/get-clients", getClientsByCodUser);
router.post("/update-client/:id", updateClient);
router.post("/delete-client/:id", deleteClient);

export default router;
