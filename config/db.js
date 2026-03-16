const mongoose = require("mongoose");
const URI = "mongodb://root:8nulzoMimYdIduYDlIAdJpz3z6wV0qItZPgxZt21GMjlZtsf05Zlpk25gpodrq3J@91.99.239.11:5734/?directConnection=true";
// const URI = "mongodb://127.0.0.1:27017/varius";

mongoose.set("strictQuery", false);

mongoose
  .connect(URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });
