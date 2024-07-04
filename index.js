const express = require("express"); //create an express app, used to create a server and handle http requests
const app = express(); //is an instance of express
const inventoryRoute = require("./routes/inventoryRoute.js");
const warehousesRoute = require("./routes/warehousesRoute.js");
// const knex = require("./knexfile.js");
const knexConfig = require("./knexfile.js");
const knex = require("knex")(knexConfig);

require("dotenv").config();
const PORT = process.env.PORT || 5050;

const cors = require("cors"); //this module enables Cross-Origin Resourse Sharing to allow different origins (domains) to access our server resources

// app.use(cors());  
// enable cors, this configures the CORS middleware to allow requests from any origin (*)
app.use(
  cors({
    origin: "https://mystore-inventory-mng.netlify.app",
  })
);
app.use(express.json());

//This middleware parses incing JSON data from requests and makes it available in req.body for easy access.
app.use(express.json());

app.use("/api/inventories", inventoryRoute);

app.use("/api/warehouses", warehousesRoute);

// GET method route
app.get("/", (req, res) => {
  res.send("GET request to.. the server is running");
});

//start the server - listen for connection on the given path (all paths on port 5050)
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

knex.raw("SELECT 1")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch(err => {
    console.error("Database connection failed", err);
  });