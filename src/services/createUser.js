const { pool } = require('../database/config');

// async function createUser(userId, nombre, email, password) {
// 	try {
// 		const res = await pool.query(
// 			`
// 			INSERT INTO schools (id, nombre, email, password) 
// 			VALUES ('${userId}', '${nombre}', '${email}', '${password}') 
// 			RETURNING *;
// 			`
// 		);
// 	} catch (e) {
// 		console.log('Error: ', e);
// 	}
// }

async function createUser(userId, nombre, email, password) {
	try {
		const query = `
            INSERT INTO schools (id, nombre, email, password) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *;
        `;
		const values = [userId, nombre, email, password];
		const res = await pool.query(query, values);
		return res.rows[0];
	} catch (error) {
		console.error('Error creating user:', error);
		throw error;
	}
}

module.exports = { createUser };
