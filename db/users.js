const { client } = require("./client");
async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT INTO users(username, password) 
            VALUES($1, $2) 
            ON CONFLICT (username) DO NOTHING 
            RETURNING *;
          `,
      [username, password]
    );
    // need to hash password later //
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(`
          SELECT id, username
          FROM users
          WHERE id=${username} AND password=${password};
        `);
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(`
        SELECT id, username
        FROM users
        WHERE id=${userId}
      `);

    if (!user) {
      return null;
    }
    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(`
          SELECT id, username
          FROM users
          WHERE username=${username}
        `);

    if (!user) {
      return null;
    }
    delete user.password;

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = { createUser, getUser, getUserById, getUserByUsername };
