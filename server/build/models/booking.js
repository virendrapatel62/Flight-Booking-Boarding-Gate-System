"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sheetSchema = exports.Booking = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _dateFns = require("date-fns");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var {
  String,
  Number
} = _mongoose.Schema.Types;
var sheetSchema = new _mongoose.Schema({
  series: {
    type: String,
    require: true
  },
  // A,B,C,D,E,F,G
  number: {
    type: Number,
    require: true
  } // 1,2,3,4,5,6,7,8,9

});
exports.sheetSchema = sheetSchema;
var bookingSchema = new _mongoose.Schema({
  date: {
    type: _mongoose.Schema.Types.Date,
    require: true,
    default: Date.now
  },
  bookingId: {
    type: Number,
    require: true
  },
  mobile: {
    type: String,
    require: true
  },
  sheets: {
    type: [sheetSchema],
    // A1, A2, B1, B3
    require: true,
    default: []
  }
});

var Booking = _mongoose.default.model("Booking", bookingSchema);

exports.Booking = Booking;