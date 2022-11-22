const sentry = require('@sentry/node');
const Sentry = require('@sentry/tracing');
require('dotenv').config();
sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
})
module.exports = ({
    service: "[SENTRY]",
    name: "Sentry",
    captureException: function captureException(err) {
        sentry.init({
            dsn: process.env.SENTRY_DSN,
            tracesSampleRate: 1.0,
        })
        sentry.captureException(err);
        console.log("[SENTRY] Error captured.");
    },
    transaction: function transaction(name, callback) {
        sentry.init({
            dsn: process.env.SENTRY_DSN,
            tracesSampleRate: 1.0,
        })
        sentry.startTransaction({
            op: "transaction",
            name: name
        });
    }
})