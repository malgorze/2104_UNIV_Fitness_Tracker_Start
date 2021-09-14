const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");

const { createUser, getUserByUsername } = require("../db");

// / POST /users/register

// Create a new user. Require username and password, and hash password before saving user to DB. Require all passwords to be at least 8 characters long.
usersRouter.post("/users/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUsername(username);
    if (user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }
    const user = await createUser({
      username,
      password,
    });
    if (password.length < 8) {
      next({
        name: "Password too short",
        message: "Password must have at least 8 characters",
      });
    }
    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      user: {
        id,
        username,
      },
      message: "Thank you for signing up",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
// POST /users/login
// Log in the user. Require username and password, and verify that plaintext login password matches the saved hashed password before returning a JSON Web Token.
usersRouter.post("/users/login", async (req, res, next) => {
  const { username, password } = req.body;
  // request must have both
  if (!username || !password) {
    next({
      name: "Missing Credentials Error",
      message: "Please supply both a username and password",
    });
  }
  try {
    const user = await getUserByUsername(username);
    if (user && user.password == password) {
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      res.send({
        message: "you're logged in!",
        token,
      });
    } else {
      next({
        name: "Incorrect Credentials Error",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET /users/me (*)
// Send back the logged-in user's data if a valid token is supplied in the header.
// GET /users/:username/routines
// Get a list of public routines for a particular user.

module.exports = { usersRouter };
