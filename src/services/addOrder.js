const { pool } = require('../database/config');

async function addOrder(orderId, schoolId, date, vegetarian, celiac, standard, caloric, ethnic) {
	try {
		const res = await pool.query(
			`
			INSERT INTO orders (id, school_id, date, vegetarian, celiac, standard, caloric, ethnic, is_rectified) 
			VALUES ('${orderId}','${schoolId}','${date}', '${vegetarian}', '${celiac}', '${standard}', '${caloric}', '${ethnic}', FALSE) 
			RETURNING *;
			`
		);
	} catch (e) {
		console.log('Error: ', e);
	}
}
module.exports = { addOrder };
