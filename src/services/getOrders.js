const { pool } = require('../database/config');

// async function getOrders(id) {
// 	try {
// 		const result = await pool.query(`SELECT * 
// 		FROM schools 
//         FULL OUTER JOIN orders ON schools.id = orders.school_id
//         WHERE schools.id IS NOT NULL
// 		`);
// 		if (id) result += ` AND schools.id =${id}`;
// 		return result.rows;
// 	} catch (e) {
// 		console.log('Error: ', e);
// 	}
// }

async function getOrders(id) {
	try {
		let query = `
            SELECT * 
            FROM schools 
            FULL OUTER JOIN orders ON schools.id = orders.school_id
            WHERE schools.id IS NOT NULL
        `;
		if (id) {
			query += ` AND schools.id = $1`;
		}
		const result = await pool.query(query, [id]);
		return result.rows;
	} catch (error) {
		console.error('Error fetching orders:', error);
		throw error;
	}
}

module.exports = { getOrders };
