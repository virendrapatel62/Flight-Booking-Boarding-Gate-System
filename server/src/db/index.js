const createDBConnection = () => {
  const { DB_URL } = process.env;
  const mongoose = require("mongoose");
  mongoose
    .connect(DB_URL, {
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
