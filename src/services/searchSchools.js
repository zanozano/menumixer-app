const moment = require('moment');
const { pool } = require('../database/config');

// const searchSchools = async ({ school, from, until }) => {

// 	try {
// 		let bodyContent = `
//         SELECT * FROM schools FULL OUTER JOIN orders ON schools.id = orders.school_id WHERE orders.id IS NOT NULL
//     `;
// 		if (school !== '') bodyContent += ` AND schools.id =${school}`;

// 		if (from !== '' &&
// 			from !== undefined
// 			&& until !== ''
// 			&& until !== undefined) bodyContent += ` AND orders.date BETWEEN '${from}' AND '${until}'`;

// 		bodyContent += ` ORDER BY orders.date DESC`

// 		console.log(bodyContent)

// 		const result = await pool.query(bodyContent);
// 		return result.rows;
// 	} catch (e) {
// 		console.log(e);
// 	}
// };

const searchSchools = async ({ school, from, until }) => {
	try {
		let query = `
            SELECT * 
            FROM schools 
            FULL OUTER JOIN orders ON schools.id = orders.school_id 
            WHERE orders.id IS NOT NULL
        `;
		const params = [];
		if (school) {
			query += ` AND schools.id = $${params.push(school)}`;
		}
		if (from && until) {
			query += ` AND orders.date BETWEEN $${params.push(from)} AND $${params.push(until)}`;
		}
		query += ` ORDER BY orders.date DESC`;
		const result = await pool.query(query, params);
		return result.rows;
	} catch (error) {
		console.error('Error searching schools:', error);
		throw error;
	}
};

module.exports = { searchSchools };
