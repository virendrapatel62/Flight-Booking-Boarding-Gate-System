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
  const bookingWithMobile = await Booking.getBookingByMobile(value.mobile);
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
  const bookings = await Booking.getAllBooking({ date });
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
  const { date = new Date() } = request.query;
  const series = createSheetSeries();
  Booking.find({
    date: {
      $gte: startOfDay(new Date(date)),
      $lte: endOfDay(new Date(date)),
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
        .reduce((flatted, item) => [...flatted, ...item], [])
        .sort((x, y) => series.indexOf(y.series) - series.indexOf(x.series));
    })
    .then((sortedBySeries) => {
      const mergedWithBookingId = {}; // bookingid : value

      const mapped = [...sortedBySeries].reduce((map, series) => {
        const group = sortedBySeries.filter(
          (ser) =>
            ser.series === series.series && ser.bookingId === series.bookingId
        );
        group.forEach((g) => {
          const index = sortedBySeries.findIndex((obj) => obj._id === g._id);
          sortedBySeries.splice(index, 1);
        });

        if (group.length) {
          map.push({
            ...series,
            sheets: group,
          });
        }

        return map;
      }, []);
      const data = [];
      for (let item of mapped) {
        const { bookingId } = item;

        const existed = data.find((i) => i.bookingId === bookingId);
        console.log(existed);
        if (!existed) {
          data.push(item);
        } else {
          existed.sheets = [...item.sheets, ...existed.sheets];
        }
      }

      response.json(data);
    })

    .catch(next);
};
