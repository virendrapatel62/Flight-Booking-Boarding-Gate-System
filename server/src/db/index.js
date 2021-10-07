const createDBConnection = () => {
  const mongoose = require("mongoose");
  mongoose
    .connect("mongodb://localhost:27017/flight", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongo DB connected....");
    })
    .catch(() => {
      console.error("Connection Error!!");
    });
};

export { createDBConnection };
