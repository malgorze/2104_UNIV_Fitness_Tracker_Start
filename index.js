// create the express server here
const express = require("express");
const cors = require("cors");
const app = express.Router();
const {
  activitieR,
  healthCheckR,
  routine_activitiesR,
  routinesR,
  usersRouter,
} = require("./index");
app.use(cors());
usersRouter.use(cors());

app.use();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is up and running on port ", port);
});

module.exports = { app };
