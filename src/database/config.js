const { Pool } = require('pg')

const pool = new Pool({
	host: 'ec2-44-194-92-192.compute-1.amazonaws.com',
	port: 5432,
	user: 'cwrwzgiehyrptu',
	password: 'bdde083b2e5185a7dbb932b38762c0c908f57daeeb7c64b01dec566f63a2e54e',
	database: 'deqh3i34ipfe6r',
	ssl: {
		rejectUnauthorized: false,
	},
});

module.exports = { pool };
