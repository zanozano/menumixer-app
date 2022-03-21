// dependencies
const { Pool } = require('pg');

// pool config
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	port: 5433,
	password: 'postgres',
	database: 'menuescolar',
});

module.exports = { pool };
