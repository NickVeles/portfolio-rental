import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createApplication,
  listApplications,
  updateApplicationStatus,
} from "../controllers/applicationControllers";

const applicationRoutes = express.Router();

applicationRoutes.post("/", authMiddleware(["tenant"]), createApplication);
applicationRoutes.put(
  "/:id/status",
  authMiddleware(["manager"]),
  updateApplicationStatus,
);
applicationRoutes.get(
  "/",
  authMiddleware(["manager", "tenant"]),
  listApplications,
);

export default applicationRoutes;
