import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  getBookingsOfUser,
  getCountOfBookingsOfUser,
} from "../controllers/booking";

const router = Router();

router.post("/", createBooking);
router.get("/", getAllBookings);
router.get("/:mobile", getBookingsOfUser);
router.get("/:mobile/count", getCountOfBookingsOfUser);

export { router as bookingRouter };
