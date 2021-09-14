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
              SELECT *
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
    const routines = await client.query(`
            SELECT activities.name 
            FROM routines
            JOIN routine_activities ON routines.id=routine_activities."routineId"
            JOIN activities ON routine_activities."activityId"=activities.id;
          `);
    return routines;
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
                FROM routines
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
    let creator = await getUserByUsername(username);
    const { rows } = await client.query(`
                  SELECT *
                  FROM routines;
                  WHERE "creatorId"=${creator.id};
                `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// getPublicRoutinesByUser({ username })
// select and return an array of public routines made by user, include their activities

async function getPublicRoutinesByUser({ username }) {
  try {
    let creator = await getUserByUsername(username);
    const { rows } = await client.query(`
                  SELECT *
                  FROM routines;
                  WHERE "creatorId"=${creator.id};
                `);
    return rows;
  } catch (error) {
    throw error;
  }
}

// getPublicRoutinesByActivity({ id })
// select and return an array of public routines which have a specific activityId in their routine_activities join, include their activities
async function getPublicRoutinesByActivity({ id }) {
  try {
    let creator = await getUserByUsername(username);
    const { rows } = await client.query(`
                  SELECT *
                  FROM routines;
                  WHERE "creatorId"=${creator.id};
                `);
    return rows;
  } catch (error) {
    throw error;
  }
}

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

async function updateRoutine({ id, isPublic, name, goal }) {
  try {
    if (isPublic) {
      await client.query(
        `UPDATE routines
        SET "isPublic"=$1
        WHERE id=${id}
        RETURNING *;`,
        [isPublic]
      );
    }
    if (name) {
      await client.query(
        `UPDATE routines
          SET name=$1
          WHERE id=${id}
          RETURNING *;`,
        [name]
      );
    }
    if (goal) {
      await client.query(
        `UPDATE routines
            SET goal=$1
            WHERE id=${id}
            RETURNING *;`,
        [goal]
      );
    }
    let routine = getRoutineById(id);
    return routine;
  } catch (error) {
    throw error;
  }
}

// destroyRoutine(id)
// remove routine from database
// Make sure to delete all the routine_activities whose routine is the one being deleted.
async function destroyRoutine(id) {
  try {
    await client.query(`
        DELETE FROM routine_activities
        WHERE "routineId"=${id};`);
  } catch (error) {
    throw error;
  }

  try {
    await client.query(`
        DELETE FROM routines
        WHERE id=${id};`);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  updateRoutine,
  getRoutinesWithoutActivities,
  getAllRoutinesByUser,
  getAllPublicRoutines,
  destroyRoutine,
  getPublicRoutinesByActivity,
  getPublicRoutinesByUser,
};
