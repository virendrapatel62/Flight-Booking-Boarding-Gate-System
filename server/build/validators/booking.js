"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookingValidationSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var {
  string,
  number,
  object
} = _joi.default;

var bookingValidationSchema = _joi.default.object({
  mobile: _joi.default.string().required().length(10),
  date: _joi.default.date().required(),
  sheets: _joi.default.array().items(_joi.default.object({
    series: _joi.default.string().required().min(1),
    number: _joi.default.number().min(1).required()
  }).required())
});

exports.bookingValidationSchema = bookingValidationSchema;