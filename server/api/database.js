const { Client } = require('pg');

// clients will also use environment variables
// for connection information
const client = new Client();
client.connect();

module.exports = client;
