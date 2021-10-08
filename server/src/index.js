import express, { json, urlencoded } from "express";
import { createDBConnection } from "./db";
import { bookingRouter } from "./routers/booking";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
createDBConnection();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`${req.method} : ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`App is Listening on ${PORT}...`);
});

app.use("/api/bookings", bookingRouter);

app.use((error, request, response, next) => {
  response.json({ error: error.message });
});
