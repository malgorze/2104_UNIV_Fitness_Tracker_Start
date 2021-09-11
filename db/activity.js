const { client } = require("./client");
// getActivityById

async function getActivityById(id) {
  try {
    const {
      rows: [activity],
    } = await client.query(`
        SELECT *
        FROM activities
        WHERE id=${id}
        ;`);

    if (!activity) {
      return null;
    }

    return activity;
  } catch (error) {
    throw error;
  }
}
// getAllActivities
async function getAllActivities() {
  try {
    const { rows } = await client.query(`
          SELECT id, name, description 
          FROM activities;
        `);
    return rows;
  } catch (error) {
    throw error;
  }
}
// select and return an array of all activities
// createActivity({ name, description })

async function createActivity({ name, description }) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
            INSERT INTO activities(name, description)
            VALUES($1, $2)
            RETURNING *;
            `,
      [name, description]
    );
    // return the new activity
    return activity;
  } catch (error) {
    throw error;
  }
}
// updateActivity({ id, name, description }) 4
// don't try to update the id
// do update the name and description
// return the updated activity

async function updateActivity({ id, name, description }) {
  if (!id) return null;

  try {
    const activity = await getActivityById(id);
    if (name) {
      // TODO: Make sure to update the activity variable here
      await client.query(
        `UPDATE activities
        SET name=$1
        WHERE id=${id}`,
        [name]
      );
    }
    if (description) {
      await client.query(
        `UPDATE activities
        SET description=$1
        WHERE id=${id}`,
        [description]
      );
    }
    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getActivityById,
  getAllActivities,
  createActivity,
  updateActivity,
};
