import { Router } from "express";
import {
  createSchedule,
  createServiceType,
  getImage,
  getSchedule,
  getServiceTypes,
  removeServiceType,
  uploadImage,
} from "../controllers/settingsController";
import { upload } from "../middleware/multerMiddleware";

const router = Router();

router.post("/create-service", createServiceType);
router.post("/get-service", getServiceTypes);
router.post("/create-schedule", createSchedule);
router.post("/get-schedule", getSchedule);
router.post("/upload-image", upload.single("logotipo"), uploadImage);
router.post("/get-image", getImage);
router.delete("/remove-service", removeServiceType);

export default router;
