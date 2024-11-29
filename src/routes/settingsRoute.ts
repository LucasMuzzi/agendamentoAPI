import { Router } from "express";
import {
  createServiceType,
  getServiceTypes,
} from "../controllers/settingsController";

const router = Router();

router.post("/create-service", createServiceType);
router.post("/get-service", getServiceTypes);

export default router;
