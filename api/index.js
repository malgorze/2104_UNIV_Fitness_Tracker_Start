// create an api router

module.exports = {
  ...require("./healthCheckR"),
  ...require("./activitiesR"),
  ...require("./usersR"),
  ...require("./routinesR"),
  ...require("./routine_activitiesR"),
};

// export the api router
// test comment
