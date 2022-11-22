require('dotenv').config();
const sql = require('mysql2');
const sentry = require('./sentry');
module.exports = ( {
    service: "[SQL]",
    name: "Database",
    connect: function connection(options, callback) {
        const connection = sql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        connection.connect(function(err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            connection.query(options, function(err, results, fields) {
                if (err) {
                    console.error(err);
                    sentry.captureException(err);
                }
                callback(results);
            });
        });
    }
})