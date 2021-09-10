
// getRoutineById(id)
// return the routine

// getRoutinesWithoutActivities
// select and return an array of all routines

// getAllRoutines
// select and return an array of all routines, include their activities

// getAllPublicRoutines
// select and return an array of public routines, include their activities

// getAllRoutinesByUser({ username })
// select and return an array of all routines made by user, include their activities

// getPublicRoutinesByUser({ username })
// select and return an array of public routines made by user, include their activities

// getPublicRoutinesByActivity({ id })
// select and return an array of public routines which have a specific activityId in their routine_activities join, include their activities

// createRoutine({ creatorId, isPublic, name, goal })
// create and return the new routine

// updateRoutine({ id, isPublic, name, goal })
// Find the routine with id equal to the passed in id
// Don't update the routine id, but do update the isPublic status, name, or goal, as necessary
// Return the updated routine

// destroyRoutine(id)
// remove routine from database
// Make sure to delete all the routine_activities whose routine is the one being deleted.
