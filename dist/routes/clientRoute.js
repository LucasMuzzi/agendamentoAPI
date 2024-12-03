"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// registerRoute.ts
const express_1 = require("express");
const clientController_1 = require("../controllers/clientController");
const router = (0, express_1.Router)();
router.post("/register-client", clientController_1.registerClient);
router.post("/get-clients", clientController_1.getClientsByCodUser);
exports.default = router;
