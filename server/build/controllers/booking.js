"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  startOfDay,
  endOfDay
} = require("date-fns");

var {
  createSheetSeries
} = require("../utils/sheet");

var {
  Booking
} = require("../models/booking");

var {
  bookingValidationSchema
} = require("../validators/booking");

module.exports.createBooking = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (request, response, next) {
    var {
      error,
      value
    } = bookingValidationSchema.validate(request.body);

    if (error) {
      response.status(400);
      return next(new Error(error.details[0].message));
    }

    var nextBookingId = (yield Booking.count()) + 100;

    var booking = _objectSpread(_objectSpread({}, value), {}, {
      bookingId: nextBookingId
    });

    var bookingWithMobile = yield Booking.find({
      mobile: value.mobile,
      date: {
        $gte: startOfDay(new Date(value.date)),
        $lte: endOfDay(new Date(value.date))
      }
    });
    console.log(bookingWithMobile);
    var sheetCount = yield bookingWithMobile.reduce((total, booking) => total + booking.sheets.length, 0);

    if (sheetCount == 6) {
      response.status(400);
      return next(new Error("Can not book more then 6 tickets"));
    }

    if (sheetCount + value.sheets.length > 6) {
      response.status(400);
      return next(new Error("Can not book more then 6 tickets, Already books ".concat(sheetCount, " Tickets")));
    }

    booking = yield Booking.create(booking);
    return response.json({
      booking,
      sheetCount
    });
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.getAllBookings = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (request, response, next) {
    var {
      date
    } = request.query;
    var filter = {
      date: {
        $gte: startOfDay(new Date(date)),
        $lte: endOfDay(new Date(date))
      }
    };
    var bookings = yield Booking.find(_objectSpread({}, date ? filter : {}));
    response.json({
      bookings
    });
  });

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports.getBookingsOfUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (request, response, next) {
    var {
      mobile
    } = request.params;
    var bookings = yield Booking.find({
      mobile,
      date: {
        $gte: startOfDay(new Date()),
        $lte: endOfDay(new Date())
      }
    });
    response.json({
      mobile,
      date: new Date(),
      count: bookings.length,
      bookings
    });
  });

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

module.exports.getCountOfBookingsOfUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (request, response, next) {
    var {
      mobile,
      date
    } = request.params;
    var bookingWithMobile = yield Booking.find({
      mobile,
      date: {
        $gte: startOfDay(new Date(date)),
        $lte: endOfDay(new Date(date))
      }
    });
    var count = yield bookingWithMobile.reduce((total, booking) => total + booking.sheets.length, 0);
    response.json({
      date: new Date(),
      sheetBooked: count,
      mobile
    });
  });

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports.getOptimizedTimeList = (request, response, next) => {
  var {
    date = new Date()
  } = request.query;
  var series = createSheetSeries();
  Booking.find({
    date: {
      $gte: startOfDay(new Date(date)),
      $lte: endOfDay(new Date(date))
    }
  }).then(bookings => {
    return bookings.map(booking => {
      var {
        sheets,
        bookingId,
        mobile,
        date
      } = booking._doc;
      return sheets.map(_ref5 => {
        var {
          _doc: sheet
        } = _ref5;
        return _objectSpread(_objectSpread({}, sheet), {}, {
          bookingId,
          mobile,
          date
        });
      });
    }).reduce((flatted, item) => [...flatted, ...item], []).sort((x, y) => series.indexOf(y.series) - series.indexOf(x.series));
  }).then(sortedBySeries => {
    var mergedWithBookingId = {}; // bookingid : value

    var mapped = [...sortedBySeries].reduce((map, series) => {
      var group = sortedBySeries.filter(ser => ser.series === series.series && ser.bookingId === series.bookingId);
      group.forEach(g => {
        var index = sortedBySeries.findIndex(obj => obj._id === g._id);
        sortedBySeries.splice(index, 1);
      });

      if (group.length) {
        map.push(_objectSpread(_objectSpread({}, series), {}, {
          sheets: group
        }));
      }

      return map;
      console.log(group); // const obj = mergedWithBookingId[series.bookingId];
      // if (obj && obj.series === series.series) {
      //   obj.sheets.push(series);
      // } else {
      //   mergedWithBookingId[series.bookingId] = {
      //     series: series.series,
      //     bookingId: series.bookingId,
      //     mobile: series.mobile,
      //     date: series.date,
      //     sheets: [series],
      //   };
      // }
    }, []);
    console.log(mapped); // return mergedWithBookingId;

    response.json(mapped);
  }) // .then((mergedWithBookingId) => {
  //   console.log(mergedWithBookingId["149"]);
  //   const list = Object.values(mergedWithBookingId);
  //   list.sort((x, y) => series.indexOf(y.series) - series.indexOf(x.series));
  //   console.log(list[0]);
  //   return response.json(list);
  // })
  .catch(next);
};