"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settingsController_1 = require("../controllers/settingsController");
const router = (0, express_1.Router)();
router.post("/create-service", settingsController_1.createServiceType);
router.post("/get-service", settingsController_1.getServiceTypes);
exports.default = router;
