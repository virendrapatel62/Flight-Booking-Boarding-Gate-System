const { startOfDay, endOfDay } = require("date-fns");
const { Booking } = require("../models/booking");
const { bookingValidationSchema } = require("../validators/booking");

module.exports.createBooking = async (request, response, next) => {
  const { error, value } = bookingValidationSchema.validate(request.body);
  if (error) {
    return next(new Error(error.details[0].message));
  }

  const nextBookingId = (await Booking.count()) + 100;

  let booking = { ...value, bookingId: nextBookingId };
  const bookingWithMobile = await Booking.find({
    mobile: value.mobile,
    date: {
      $gte: startOfDay(new Date()),
      $lte: endOfDay(new Date()),
    },
  });

  console.log(bookingWithMobile);
  const sheetCount = await bookingWithMobile.reduce(
    (total, booking) => total + booking.sheets.length,
    0
  );
  if (sheetCount == 6) {
    response.status(400);
    return next(new Error("Can not book more then 6 tickets"));
  }

  if (sheetCount + value.sheets.length > 6) {
    response.status(400);
    return next(
      new Error(
        `Can not book more then 6 tickets, Already books ${sheetCount} Tickets`
      )
    );
  }

  booking = await Booking.create(booking);

  return response.json({ booking, sheetCount });
};

module.exports.getAllBookings = async (request, response, next) => {
  const bookings = await Booking.find();
  response.json({ bookings });
};

module.exports.getBookingsOfUser = async (request, response, next) => {
  const { mobile } = request.params;

  const bookings = await Booking.find({
    mobile,
    date: {
      $gte: startOfDay(new Date()),
      $lte: endOfDay(new Date()),
    },
  });

  response.json({ mobile, date: new Date(), count: bookings.length, bookings });
};

module.exports.getCountOfBookingsOfUser = async (request, response, next) => {
  const { mobile } = request.params;
  const bookingWithMobile = await Booking.find({
    mobile,
    date: {
      $gte: startOfDay(new Date()),
      $lte: endOfDay(new Date()),
    },
  });

  const count = await bookingWithMobile.reduce(
    (total, booking) => total + booking.sheets.length,
    0
  );
  response.json({ date: new Date(), sheetBooked: count, mobile });
};
