import express from "express";
import product_router from "./routes/products";
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", product_router);

app.listen(port, () => {
  console.log("server is running");
});
