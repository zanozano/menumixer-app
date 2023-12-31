const { pool } = require('../database/config');

// async function getSchools() {
// 	try {
// 		const result = await pool.query(`SELECT * FROM schools`);
// 		return result.rows;
// 	} catch (e) {
// 		console.log('Error: ', e);
// 	}
// }

async function getSchools() {
	try {
		const result = await pool.query(`SELECT * FROM schools`);
		return result.rows;
	} catch (error) {
		console.error('Error fetching schools:', error);
		throw error;
	}
}

module.exports = { getSchools };
