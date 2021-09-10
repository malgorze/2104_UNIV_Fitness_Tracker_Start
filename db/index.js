const { client } = require("./client");
const {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
} = require("./users");

const {
  getActivityById,
  getAllActivities,
  createActivity,
  updateActivity,
} = require("./activity");

const {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
} = require("./routines");

module.exports = {
  client,
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
  getActivityById,
  getAllActivities,
  createActivity,
  updateActivity,
  getAllRoutines,
  getRoutineById,
  createRoutine,
  getRoutinesWithoutActivities,
};
