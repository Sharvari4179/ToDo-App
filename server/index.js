const express = require('express')

const connection = require('./db')
connection();

const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors)

const tasks = require("../server/routes/tasks")
app.use("/api/tasks", tasks);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening at port ${port}..`))