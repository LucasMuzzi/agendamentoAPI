import { Router } from "express";
import {
  createSchedule,
  createServiceType,
  getSchedule,
  getServiceTypes,
} from "../controllers/settingsController";

const router = Router();

router.post("/create-service", createServiceType);
router.post("/get-service", getServiceTypes);
router.post("/create-schedule", createSchedule);
router.post("/get-schedule", getSchedule);

export default router;
