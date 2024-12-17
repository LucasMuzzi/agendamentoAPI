import { Router } from "express";

import { upload } from "../middleware/multerMiddleware";
import { SettingsController } from "../controllers/settingsController";

const router = Router();
const settingsController = new SettingsController();

router.post("/create-service", settingsController.createServiceType);
router.post("/get-service", settingsController.getServiceTypes);
router.post("/create-schedule", settingsController.createSchedule);
router.post("/get-schedule", settingsController.getSchedule);
router.post(
  "/upload-image",
  upload.single("logotipo"),
  settingsController.uploadImage
);
router.post("/get-image", settingsController.getImage);
router.delete("/remove-service", settingsController.removeServiceType);

export default router;
