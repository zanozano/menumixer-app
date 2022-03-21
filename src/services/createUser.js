const { pool } = require('../database/config');

async function createUser(nombre, email, password) {
	try {
		const res = await pool.query(
			`
			INSERT INTO schools (nombre, email, password) 
			VALUES ('${nombre}', '${email}', '${password}') 
			RETURNING *;
			`
		);
	} catch (e) {
		console.log('Error: ', e);
	}
}
module.exports = { createUser };
