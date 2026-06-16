//express server
const express = require("express"); //import express
const dotenv = require("dotenv");

dotenv.config();

const app = express(); //write instance of express

//handle request using instance of express
app.use((req, res) => {
  res.send("server is running on port 5000");
  console.log(`server is running on port 5000`);
});

app.listen(process.env.PORT);
console.log(process.env.PORT);

//simple server code in backend

// const http = require("http");

// const port = 4000;
// const server = http.createServer((req, res) => {
//   res.end(`serve listening on ${port}`);
// });

// server.listen(port, () => {
//   console.log(`server running at http://localhost:${port}`);
// });
