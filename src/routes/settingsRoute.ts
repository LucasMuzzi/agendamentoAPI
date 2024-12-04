import { Router } from "express";
import {
  createSchedule,
  createServiceType,
  getSchedule,
  getServiceTypes,
  uploadImage,
} from "../controllers/settingsController";
import { upload } from "../middleware/multerMiddleware";

const router = Router();

router.post("/create-service", createServiceType);
router.post("/get-service", getServiceTypes);
router.post("/create-schedule", createSchedule);
router.post("/get-schedule", getSchedule);
router.post("/upload-image", upload.single("logotipo"), uploadImage);

export default router;
