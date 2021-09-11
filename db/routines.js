const { client } = require("./client");

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(`
          SELECT *
          FROM routines
          WHERE id=${id};
        `);

    if (!routine) {
      return null;
    }
    return routine;
  } catch (error) {
    throw error;
  }
}

// getRoutinesWithoutActivities
// select and return an array of all routines
async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(`
              SELECT name
              FROM routines;
            `);
    return rows;
  } catch (error) {
    throw error;
  }
}
// getAllRoutines
// select and return an array of all routines, include their activities
async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
            SELECT name
            FROM routines;
          `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// getAllPublicRoutines
// select and return an array of public routines, include their activities
async function getAllPublicRoutines() {
  try {
    const { rows } = await client.query(`
                SELECT *  
                FROM routines;
                WHERE "isPublic"=true;
              `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// getAllRoutinesByUser({ username })
// select and return an array of all routines made by user, include their activities

async function getAllRoutinesByUser({ username }) {
  try {
    const { rows } = await client.query(`
                  SELECT name  
                  FROM routines;
                  WHERE "isPublic"=true;
                `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// getPublicRoutinesByUser({ username })
// select and return an array of public routines made by user, include their activities

// getPublicRoutinesByActivity({ id })
// select and return an array of public routines which have a specific activityId in their routine_activities join, include their activities

// createRoutine({ creatorId, isPublic, name, goal })
// create and return the new routine
async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
              INSERT INTO routines("creatorId", "isPublic", name, goal)
              VALUES($1, $2, $3, $4)
              RETURNING *;
              `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

// updateRoutine({ id, isPublic, name, goal })
// Find the routine with id equal to the passed in id
// Don't update the routine id, but do update the isPublic status, name, or goal, as necessary
// Return the updated routine

// destroyRoutine(id)
// remove routine from database
// Make sure to delete all the routine_activities whose routine is the one being deleted.

module.exports = {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  getRoutinesWithoutActivities,
  getAllPublicRoutines,
};
