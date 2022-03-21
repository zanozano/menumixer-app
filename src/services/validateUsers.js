const { pool } = require('../database/config');

async function validateUsers(email, password) {
	try {
		const result = await pool.query(
			`SELECT * FROM schools WHERE email = '${email}' AND password = '${password}'`
		);
		return result.rows;
	} catch (e) {
		console.log('Error: ', e);
	}
}
module.exports = { validateUsers };
