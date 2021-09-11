// create an api router

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
 console.log('Server is up and running on port ', port);
})


// attach other routers from files in this api directory (users, activities...)

const usersRouter = require("./users");
const activitiesRouter = require("./activities");
const routinesRouter = require("./routines");



// export the api router
// test comment