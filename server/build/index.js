"use strict";

var _express = _interopRequireWildcard(require("express"));

var _db = require("./db");

var _booking = require("./routers/booking");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _cors = _interopRequireDefault(require("cors"));

var _booking2 = require("./models/booking");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_dotenv.default.config();

var PORT = process.env.PORT || 3000;
var app = (0, _express.default)();
(0, _db.createDBConnection)();
app.use((0, _cors.default)());
app.use((0, _express.json)());
app.use(_express.default.static("public"));
app.use((0, _express.urlencoded)({
  extended: true
}));
app.use((req, res, next) => {
  console.log("".concat(req.method, " : ").concat(req.url));
  next();
});
app.listen(PORT, () => {
  console.log("App is Listening on ".concat(PORT, "..."));
});
app.use("/api/bookings", _booking.bookingRouter);
app.all("/api/*", (_, response) => {
  response.status(404).json({
    message: "Not found"
  });
});
app.get("*", (_, response) => {
  var path = require("path");

  return response.sendFile(path.join(__dirname, "../public/index.html"));
});
app.use((error, request, response, next) => {
  response.json({
    error: error.message
  });
}); // serve react application
// Booking.deleteMany({}).then(console.log);