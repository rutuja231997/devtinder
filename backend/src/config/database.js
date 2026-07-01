const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
};

// connectDB()
//   .then(() => {
//     console.log("database connection established");
//     console.log(process.env.DATABASE_URL);
//   })
//   .catch((err) => {
//     console.log("database can not be connected");
//   });

module.exports = connectDB;
