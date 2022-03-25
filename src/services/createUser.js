const { pool } = require('../database/config');

async function createUser(userId, nombre, email, password) {
	try {
		const res = await pool.query(
			`
			INSERT INTO schools (id, nombre, email, password) 
			VALUES ('${userId}', '${nombre}', '${email}', '${password}') 
			RETURNING *;
			`
		);
	} catch (e) {
		console.log('Error: ', e);
	}
}
module.exports = { createUser };
