import { Router } from "express";
import { SettingsController } from "../controllers/settingsController";

const router = Router();
const settingsController = new SettingsController();

router.post("/create-service", settingsController.createServiceType);
router.post("/get-service", settingsController.getServiceTypes);
router.post("/create-schedule", settingsController.createSchedule);
router.post("/get-schedule", settingsController.getSchedule);
router.delete("/remove-service", settingsController.removeServiceType);

export default router;
