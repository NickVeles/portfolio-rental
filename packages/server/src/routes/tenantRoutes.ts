import express from "express";
import {
  getTenant,
  createTenant,
  updateTenant,
  getCurrentResidences,
  addFavoriteProperty,
  removeFavoriteProperty,
} from "../controllers/tenantControllers";

const tenantRoutes = express.Router();

tenantRoutes.get("/:cognitoId", getTenant);
tenantRoutes.put("/:cognitoId", updateTenant);
tenantRoutes.get("/:cognitoId/current-residences", getCurrentResidences);
tenantRoutes.post("/", createTenant);
tenantRoutes.post("/:cognitoId/favorites/:propertyId", addFavoriteProperty);
tenantRoutes.delete(
  "/:cognitoId/favorites/:propertyId",
  removeFavoriteProperty,
);

export default tenantRoutes;
