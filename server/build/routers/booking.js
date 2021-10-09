"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookingRouter = void 0;

var _express = require("express");

var _booking = require("../controllers/booking");

var router = (0, _express.Router)();
exports.bookingRouter = router;
router.post("/", _booking.createBooking);
router.get("/", _booking.getAllBookings);
router.get("/time-optimized-list", _booking.getOptimizedTimeList);
router.get("/:mobile", _booking.getBookingsOfUser);
router.get("/:mobile/:date/count", _booking.getCountOfBookingsOfUser);