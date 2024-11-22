import { Router } from "express";
import {
  createUser,
  loginUser,
  requestPasswordReset,
  verifyResetCode,
  logoutUser,
} from "../controllers/userController";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/request-password-reset", requestPasswordReset);
router.post("/verify-reset-code", verifyResetCode);
router.post("/logout", logoutUser ); 

export default router;
