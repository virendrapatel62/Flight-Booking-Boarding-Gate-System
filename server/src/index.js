import express, { json, urlencoded } from "express";
import { createDBConnection } from "./db";
import { bookingRouter } from "./routers/booking";

const app = express();
createDBConnection();

app.use(json());
app.use(urlencoded({ extended: true }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is Listening on ${PORT}...`);
});

app.use("/api/bookings", bookingRouter);

app.use((error, request, response, next) => {
  response.json({ error: error.message });
});
