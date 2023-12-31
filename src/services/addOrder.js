const { pool } = require('../database/config');

// async function addOrder(orderId, schoolId, date, vegetarian, celiac, standard, caloric, ethnic) {
// 	try {
// 		const res = await pool.query(
// 			`
// 			INSERT INTO orders (id, school_id, date, vegetarian, celiac, standard, caloric, ethnic, is_rectified) 
// 			VALUES ('${orderId}','${schoolId}','${date}', '${vegetarian}', '${celiac}', '${standard}', '${caloric}', '${ethnic}', FALSE) 
// 			RETURNING *;
// 			`
// 		);
// 	} catch (e) {
// 		console.log('Error: ', e);
// 	}
// }

async function addOrder(orderId, schoolId, date, vegetarian, celiac, standard, caloric, ethnic) {
	try {
		const query = `
            INSERT INTO orders (id, school_id, date, vegetarian, celiac, standard, caloric, ethnic, is_rectified) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, FALSE) 
            RETURNING *;
        `;
		const values = [orderId, schoolId, date, vegetarian, celiac, standard, caloric, ethnic];
		const res = await pool.query(query, values);
		return res.rows[0];
	} catch (error) {
		console.error('Error adding order:', error);
		throw error;
	}
}

module.exports = { addOrder };
