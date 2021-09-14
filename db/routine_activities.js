const { client } = require("./client");

// getRoutineActivityById
// getRoutineActivityById(id)
// return the routine_activity

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(`
         SELECT *
         FROM routine_activities
         WHERE id=${id};
         `);
    if (!routine_activity) {
      return null;
    }
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

// addActivityToRoutine
// addActivityToRoutine({ routineId, activityId, count, duration })
// create a new routine_activity, and return it

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      ` 
        INSERT INTO routine_activities("routineId", "activityId", count, duration)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `,
      [routineId, activityId, count, duration]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

// updateRoutineActivity
// updateRoutineActivity({ id, count, duration })
// Find the routine with id equal to the passed in id
// Update the count or duration as necessary

async function updateRoutineActivity({ id, count, duration }) {
  try {
    await client.query(`
        UPDATE routine_activities
        SET count=$1, duration=$2
        WHERE id=${id};
        `),
      [count, duration];
    let routine_activity = await getRoutineActivityById(id);
    return routine_activity;
  } catch (error) {
    throw error;
  }
}

// destroyRoutineActivity
// destroyRoutineActivity(id)
// remove routine_activity from database

async function destroyRoutineActivity(id) {
  try {
    let routine_activity = await getRoutineActivityById(id);
    console.log(routine_activity.id);
    routine_activity = await client.query(
      `
      DELETE FROM routine_activities
      WHERE id=${routine_activity.id};`
    );
  } catch (error) {
    throw error;
  }
}

// getRoutineActivitiesByRoutine
// getRoutineActivitiesByRoutine({ id })
// select and return an array of all routine_activity records

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows } = await client.query(`
        SELECT "activityId"
        FROM routine_activities
        WHERE "routineId"=${id};
        `);
    if (!rows) {
      return null;
    }
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
