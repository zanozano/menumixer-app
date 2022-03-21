const { pool } = require('../database/config');

async function getSchools() {
	try {
		const result = await pool.query(`SELECT * FROM schools`);
		return result.rows;
	} catch (e) {
		console.log('Error: ', e);
	}
}
module.exports = { getSchools };
