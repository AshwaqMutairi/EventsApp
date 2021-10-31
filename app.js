const express = require("express");
const app = express();
const router = require("./apis/events/routes");
const morgan = require("morgan");

let events = require("./data");
const connectDb = require("./db/database");

app.use(express.json());
app.use(morgan("dev"));
connectDb();

//MiddleWare.
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
});

app.use("/api/events", router);

app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
  // next();
});

//keep this at the end
app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
