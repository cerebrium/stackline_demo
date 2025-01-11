import express from "express";
import { get_products } from "./get";
const router = express.Router();

router.get("/products", get_products);

export default router;
