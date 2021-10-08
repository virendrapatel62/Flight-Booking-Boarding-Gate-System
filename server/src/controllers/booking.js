const { startOfDay, endOfDay } = require("date-fns");
const { createSheetSeries } = require("../utils/sheet");
const { Booking } = require("../models/booking");
const { bookingValidationSchema } = require("../validators/booking");

module.exports.createBooking = async (request, response, next) => {
  const { error, value } = bookingValidationSchema.validate(request.body);
  if (error) {
    response.status(400);
    return next(new Error(error.details[0].message));
  }

  const nextBookingId = (await Booking.count()) + 100;

  let booking = { ...value, bookingId: nextBookingId };
  const bookingWithMobile = await Booking.find({
    mobile: value.mobile,
    date: {
      $gte: startOfDay(new Date(value.date)),
      $lte: endOfDay(new Date(value.date)),
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
  const { date } = request.query;
  const filter = {
    date: {
      $gte: startOfDay(new Date(date)),
      $lte: endOfDay(new Date(date)),
    },
  };
  const bookings = await Booking.find({
    ...(date ? filter : {}),
  });
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
  const { mobile, date } = request.params;
  const bookingWithMobile = await Booking.find({
    mobile,
    date: {
      $gte: startOfDay(new Date(date)),
      $lte: endOfDay(new Date(date)),
    },
  });

  const count = await bookingWithMobile.reduce(
    (total, booking) => total + booking.sheets.length,
    0
  );
  response.json({ date: new Date(), sheetBooked: count, mobile });
};

module.exports.getOptimizedTimeList = (request, response, next) => {
  const series = createSheetSeries();
  Booking.find({
    date: {
      $gte: startOfDay(new Date()),
      $lte: endOfDay(new Date()),
    },
  })
    .then((bookings) => {
      return bookings
        .map((booking) => {
          const { sheets, bookingId, mobile, date } = booking._doc;
          return sheets.map(({ _doc: sheet }) => {
            return {
              ...sheet,
              bookingId,
              mobile,
              date,
            };
          });
        })
        .reduce((flatted, item) => [...flatted, ...item], []);
      // .sort((x, y) => series.indexOf(y.series) - series.indexOf(x.series));
    })
    .then((sortedBySeries) => {
      const mergedWithBookingId = {}; // bookingid : value

      sortedBySeries.forEach((series) => {
        const obj = mergedWithBookingId[series.bookingId];
        if (obj && obj.series === series.series) {
          obj.sheets.push(series);
        } else {
          mergedWithBookingId[series.bookingId] = {
            series: series.series,
            bookingId: series.bookingId,
            mobile: series.mobile,
            sheets: [series],
          };
        }
      });
      return mergedWithBookingId;
    })
    .then((mergedWithBookingId) => {
      const list = Object.values(mergedWithBookingId);
      list.sort((x, y) => series.indexOf(y.series) - series.indexOf(x.series));
      console.log(list);
      response.json(list);
    })
    .then(next);
};
