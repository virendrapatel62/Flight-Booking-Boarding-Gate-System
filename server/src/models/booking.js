import { BookingModel } from "../db/schemas/bookings";
const { startOfDay, endOfDay } = require("date-fns");

class Booking {
  constructor(bookingId = null, mobile = "", date = new Date(), sheets = []) {
    this.bookingId = bookingId;
    this.mobile = mobile;
    this.date = date;
    this.sheets = sheets;
  }

  static getBookingByMobile(mobile, date = new Date()) {
    return BookingModel.find({
      mobile,
      date: {
        $gte: startOfDay(new Date(date)),
        $lte: endOfDay(new Date(date)),
      },
    });
  }
  static getSheetCountBookedByUser(mobile, date = new Date()) {
    return BookingModel.aggregate([
      { $project: { seatCount: { $size: "$sheets" } } },
    ])
      .then((bookings) =>
        bookings.reduce((total, { seatCount }) => total + seatCount, 0)
      )
      .then((count) => ({ count }));
  }

  static getAllBooking(filter) {
    const { date } = filter;
    const _filter = {
      date: {
        $gte: startOfDay(new Date(date)),
        $lte: endOfDay(new Date(date)),
      },
    };
    return BookingModel.find({
      ...(date ? _filter : {}),
    });
  }
}

export { Booking };
