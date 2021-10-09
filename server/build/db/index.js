"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDBConnection = void 0;

var createDBConnection = () => {
  var {
    DB_URL
  } = process.env;

  var mongoose = require("mongoose");

  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("Mongo DB connected....");
  }).catch(() => {
    console.error("Connection Error!!");
  });
};

exports.createDBConnection = createDBConnection;