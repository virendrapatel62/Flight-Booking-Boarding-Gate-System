import mongoose, { Schema } from "mongoose";
import { startOfDay } from "date-fns";
import { sheetSchema } from "./booking";
const { String, Number, Date } = Schema.Types;

const bookedSheetSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
});

export { Booking };
