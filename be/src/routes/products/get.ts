import { json, type Request, type Response } from "express";
import path from "path";
import { readFileSync } from "node:fs";

export function get_products(req: Request, res: Response): void {
  try {
    const path_to_data = path.join(
      __dirname,
      "../../assets/stackline_product_data.json",
    );

    const products = readFileSync(path_to_data, "utf-8");
    const json_products = JSON.parse(products);

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(json_products);
  } catch (e) {
    res.status(500).json(e);
  }
}
