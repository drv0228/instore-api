// Import dotenv to process environment variables from `.env` file.
require("dotenv").config();

//Setting up database connection creating in knexfile.js
module.exports = {
  client: "mysql",
  connection: {
    host: "localhost",
    database: "instore",
    user: "root",
    password: "rootroot",
    charset: "utf8",
  },
};

// module.exports = {
//     client: "mysql",
//     connection: {
//       host: process.env.DB_HOST,
//       database: process.env.DB_LOCAL_DBNAME,
//       user: process.env.DB_LOCAL_USER,
//       password: process.env.DB_LOCAL_PASSWORD,
//       charset: "utf8",
//     },
//   };