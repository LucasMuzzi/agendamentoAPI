import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();
const userController = new UserController();

router.post("/register", userController.createUser);
router.get("/get-users", userController.getUsers);
router.post("/login", userController.loginUser);
router.post("/request-password-reset", userController.requestPasswordReset);
router.post("/verify-reset-code", userController.verifyResetCode);
router.post("/logout", userController.logoutUser);
router.post("/edit-user", userController.editUserByCodUser);
router.post("/delete-user", userController.deleteUserByCodUser);

export default router;
