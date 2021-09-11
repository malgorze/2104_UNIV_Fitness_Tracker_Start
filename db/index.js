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

const {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
} = require("./routine_activities");

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
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
