const express = require("express");
const activitiesRouter = express.Router();
// GET /activities
// Just return a list of all activities in the database
const { createActivity } = require("../db/activities");
const { getAllActivities } = require("../db/activity");
activitiesRouter.get("/api/activities", async (req, res) => {
  try {
    const allActivities = await getAllActivities();
    const activites = allActivities.filter((activities) => {
      return activities;
    });
    res.send({
      activites,
    });
  } catch (error) {
    console.log(error);
  }
});
// POST /activities (*)
// Create a new activity
activitiesRouter.post("/api/activities", async (req, res) => {
  try {
    const newActivity = await createActivity();
    if (activity) {
      return activites;
    }
  } catch (error) {
    console.log(error);
  }
});
// PATCH /activities/:activityId (*)
// Anyone can update an activity (yes, this could lead to long term problems a la wikipedia)
// GET /activities/:activityId/routines
// Get a list of all public routines which feature that activity

module.exports = { activitiesRouter };
