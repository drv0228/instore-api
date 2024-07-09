require("dotenv").config();
const mysql = require('mysql');

// Function to establish database connection with retry logic
async function connectToDatabase() {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        charset: "utf8",
        connectTimeout: 10000,
        timezone: 'UTC',
        dateStrings: true
    });

    try {
        await new Promise((resolve, reject) => {
            connection.connect((err) => {
                if (err) reject(err);
                console.log('Connected to MySQL database successfully!');
                resolve();
            });
        });
    } catch (error) {
        console.error('Error connecting to MySQL database:', error.message);
        // Retry logic can be added here
        // For example, wait for a period and then attempt to connect again
        setTimeout(connectToDatabase, 5000); // Retry after 5 seconds
    }

    return connection;
}

// Export Knex configuration
module.exports = {
    client: "mysql",
    connection: async function() {
        let connection;
        try {
            connection = await connectToDatabase();
        } catch (error) {
            console.error('Failed to establish initial database connection:', error.message);
            throw error;
        }
        return connection;
    }
};