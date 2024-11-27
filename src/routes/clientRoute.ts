// registerRoute.ts
import { Router } from "express";
import {
  getClientsByCodUser,
  registerClient,
} from "../controllers/clientController";

const router = Router();

router.post("/register-client", registerClient);
router.post("/get-clients", getClientsByCodUser);

export default router;
