"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const get_1 = require("./get");
const router = express_1.default.Router();
router.get("/products", get_1.get_products);
exports.default = router;
