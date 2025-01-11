"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_products = get_products;
const path_1 = __importDefault(require("path"));
const node_fs_1 = require("node:fs");
function get_products(req, res) {
    try {
        const path_to_data = path_1.default.join(__dirname, "../../assets/stackline_product_data.json");
        const products = (0, node_fs_1.readFileSync)(path_to_data, "utf-8");
        const json_products = JSON.parse(products);
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(json_products);
    }
    catch (e) {
        res.status(500).json(e);
    }
}
