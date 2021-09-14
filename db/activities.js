const { client } = require("./client");

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
    return activity;
  } catch (error) {
    throw error;
  }
}

async function updateActivity({ id, name, description }) {
  if (!id) return null;

  try {
    await client.query(
      `UPDATE activities
        SET name=$1
        WHERE id=${id};`,
      [name]
    );

    await client.query(
      `UPDATE activities
        SET description=$1
        WHERE id=${id};`,
      [description]
    );

    let activity = await getActivityById(id);

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
