// Importing the Express library
const express = require("express");
//  initialize an instance of an Express application
const app = express();
// Defining the port number for the server
const PORT = 7777; // Use a number for the port
// Starting the server and listening on the specified port
app.listen(PORT, (error) => {
    if (!error) {
        // If no error, the server starts successfully
        console.log(`Server is listening on port ${PORT}`);
    } else {
        // If there is an error starting the server, it is logged to the console
        console.error("Error in starting the server:", error);
    }
});
// Setting up a route for the root URL ("/")
app.use("/", (req, res) => {
    // Responds with "Hello world" when a request is made to the root URL
    res.send("Hello world");
});

