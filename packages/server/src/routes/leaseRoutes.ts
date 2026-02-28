import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getLeasePayments, getLeases } from "../controllers/leaseControllers";

const leaseRoutes = express.Router();

leaseRoutes.get("/", authMiddleware(["manager", "tenant"]), getLeases);
leaseRoutes.get(
  "/:id/payments",
  authMiddleware(["manager", "tenant"]),
  getLeasePayments,
);

export default leaseRoutes;
