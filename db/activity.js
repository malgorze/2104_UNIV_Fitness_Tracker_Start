const { client } = require("./client");
// getActivityById
async function getActivityById(activityId) {
    try {
        const {
            rows: [activity],
        } = await client.query(`
        SELECT id, activity
        FROM activities
        WHERE id=${activityId}
        `);
    if (!activity) {
        return null;
    }
    return activity;
    } catch (error) {
        throw error;
    }
};
// getAllActivities
async function getAllActivities();
// select and return an array of all activities
// createActivity({ name, description })
async function createActivity({ name, description }) {
    try {
        const {
            rows: [activity],
        } = await client.query(`
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
};
// updateActivity({ id, name, description }) 4
// don't try to update the id
// do update the name and description
// return the updated activity
async function updateActivity({ id, name, description }) {
    try {
        const {
            rows: [activity],
        } = await client.query(`
            UPDATE acitivities(id, name, description)
            VALUES($1, $2, $3)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
            `,
            [id, name, description]
            );
    }
}
module.exports = { getActivityById, getAllActivites, createActivity, updateActivity };