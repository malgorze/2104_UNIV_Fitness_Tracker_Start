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
  destroyRoutine,
  getAllRoutinesByUser,
} = require("./routines");

const {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
} = require("./routine_activities");

// TODO: Finish implementing this
// module.exports = {
//   ...require("./users"),
//   ...require("./activity"),
//   ...require("./routine_activities")
// }

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
  destroyRoutine,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getRoutinesWithoutActivities,
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
