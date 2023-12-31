const { pool } = require('../database/config');

// async function validateUsers(email, password) {
// 	try {
// 		const result = await pool.query(
// 			`SELECT * FROM schools WHERE email = '${email}' AND password = '${password}'`
// 		);
// 		return result.rows;
// 	} catch (e) {
// 		console.log('Error: ', e);
// 	}
// }

async function validateUsers(email, password) {
	try {
		const query = `
            SELECT * 
            FROM schools 
            WHERE email = $1 AND password = $2
        `;
		const values = [email, password];
		const result = await pool.query(query, values);
		return result.rows;
	} catch (error) {
		console.error('Error validating users:', error);
		throw error;
	}
}

module.exports = { validateUsers };
