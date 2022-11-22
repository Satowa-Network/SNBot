require('dotenv').config();
const {Client, IntentsBitField, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});
const sql = require('./services/sql');
const sentry = require('./services/sentry');
try {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        console.log("Check Database connection");
        try {
            sql.connect("SELECT * FROM `users`", function(results) {
                console.log(results);
            });
        } catch (err) {
            sentry.captureException(err);
        }
    });
} catch (err) {
    sentry.captureException(err);
}
try {
    client.login(process.env.TOKEN);
} catch (err) {
    sentry.captureException(err);
}