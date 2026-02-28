import express from "express";
import {
  getManager,
  createManager,
  updateManager,
  getManagerProperties,
} from "../controllers/managerControllers";

const managerRoutes = express.Router();

managerRoutes.get("/:cognitoId", getManager);
managerRoutes.put("/:cognitoId", updateManager);
managerRoutes.get("/:cognitoId/properties", getManagerProperties);
managerRoutes.post("/", createManager);

export default managerRoutes;
