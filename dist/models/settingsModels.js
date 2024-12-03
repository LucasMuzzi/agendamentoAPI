"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const serviceTypeSchema = new mongoose_1.Schema({
    nome: { type: String, required: true },
    codUser: { type: String, required: true },
});
const ServiceType = (0, mongoose_1.model)("Settings", serviceTypeSchema);
exports.default = ServiceType;
