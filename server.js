// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 3000;
// Setup Server

// TODO-Spin up the server

const server = app.listen(port, listening);
function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

app.post("/postdata", function (req, res) {
    const data = req.body;
    projectData = {
        temp: data,
        date: newDate,
        content: feelings,
    }
    res.send(projectData);
})

app.get("/getdata", function (req, res) {
    res.send(projectData);
})

