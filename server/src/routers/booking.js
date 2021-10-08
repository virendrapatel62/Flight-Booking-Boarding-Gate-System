import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  getBookingsOfUser,
  getCountOfBookingsOfUser,
  getOptimizedTimeList,
} from "../controllers/booking";

const router = Router();

router.post("/", createBooking);
router.get("/", getAllBookings);

router.get("/time-optimized-list", getOptimizedTimeList);
router.get("/:mobile", getBookingsOfUser);
router.get("/:mobile/:date/count", getCountOfBookingsOfUser);

export { router as bookingRouter };
