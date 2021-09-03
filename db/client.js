// build and export your unconnected client here
require("dotenv").config();
const { Client } = require("pg");
const client = new Client("postgres://localhost:5432/fitness-dev");

module.exports = { client };
