import mongoose, { Schema } from "mongoose";
import { startOfDay } from "date-fns";
const { String, Number } = Schema.Types;

const sheetSchema = new Schema({
  series: { type: String, require: true }, // A,B,C,D,E,F,G
  number: { type: Number, require: true }, // 1,2,3,4,5,6,7,8,9
});

const bookingSchema = new Schema({
  date: {
    type: Schema.Types.Date,
    require: true,
    default: Date.now,
  },
  bookingId: {
    type: Number,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  sheets: {
    type: [sheetSchema], // A1, A2, B1, B3
    require: true,
    default: [],
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export { Booking, sheetSchema };
