const { pool } = require('../database/config');

async function getOrders(id) {
	try {
		const result = await pool.query(`SELECT * 
		FROM schools 
        FULL OUTER JOIN orders ON schools.id = orders.school_id
        WHERE schools.id IS NOT NULL
		`);
		if (id) result += ` AND schools.id =${id}`;
		return result.rows;
	} catch (e) {
		console.log('Error: ', e);
	}
}
module.exports = { getOrders };
