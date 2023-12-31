const { pool } = require('../database/config');

// async function updateOrder(id, schoolId, vegetarian, celiac, standard, caloric, ethnic, commets) {
// 	try {
// 		const res = await pool.query(
// 			`
// 			UPDATE orders SET
// 			vegetarian = '${vegetarian}', 
// 			celiac = '${celiac}', 
// 			standard = '${standard}', 
// 			caloric = '${caloric}', 
// 			ethnic = '${ethnic}', 
// 			is_rectified = 'TRUE',
// 			observations = '${commets}'
// 			WHERE school_id = '${schoolId}' AND id = '${id}'
// 			RETURNING *;
// 			`
// 		);
// 	} catch (e) {
// 		console.log('Error: ', e);
// 	}
// }

async function updateOrder(id, schoolId, vegetarian, celiac, standard, caloric, ethnic, comments) {
	try {
		const query = `
            UPDATE orders SET
            vegetarian = $1, 
            celiac = $2, 
            standard = $3, 
            caloric = $4, 
            ethnic = $5, 
            is_rectified = TRUE,
            observations = $6
            WHERE school_id = $7 AND id = $8
            RETURNING *;
        `;
		const values = [vegetarian, celiac, standard, caloric, ethnic, comments, schoolId, id];
		const res = await pool.query(query, values);
		return res.rows[0];
	} catch (error) {
		console.error('Error updating order:', error);
		throw error;
	}
}

module.exports = { updateOrder };
