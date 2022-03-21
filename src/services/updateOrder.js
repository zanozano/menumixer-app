const { pool } = require('../database/config');

async function updateOrder(id, schoolId, vegetarian, celiac, standard, caloric, ethnic, commets) {
	try {
		const res = await pool.query(
			`
			UPDATE orders SET
			vegetarian = '${vegetarian}', 
			celiac = '${celiac}', 
			standard = '${standard}', 
			caloric = '${caloric}', 
			ethnic = '${ethnic}', 
			is_rectified = 'TRUE',
			observations = '${commets}'
			WHERE school_id = '${schoolId}' AND id = '${id}'
			RETURNING *;
			`
		);
	} catch (e) {
		console.log('Error: ', e);
	}
}
module.exports = { updateOrder };
