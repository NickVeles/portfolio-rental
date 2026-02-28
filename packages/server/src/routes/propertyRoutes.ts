import express from "express";
import {
  getProperties,
  getProperty,
  createProperty,
} from "../controllers/propertyControllers";
import { authMiddleware } from "../middleware/authMiddleware";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const propertyRoutes = express.Router();

propertyRoutes.get("/", getProperties);
propertyRoutes.get("/:id", getProperty);
propertyRoutes.post(
  "/",
  authMiddleware(["manager"]),
  upload.array("photos"),
  createProperty,
);

export default propertyRoutes;
