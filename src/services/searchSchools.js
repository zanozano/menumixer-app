var moment = require('moment'); // require
const { pool } = require('../database/config');

const searchSchools = async ({ school, from, until }) => {

	try {
		let bodyContent = `
        SELECT * FROM schools FULL OUTER JOIN orders ON schools.id = orders.school_id WHERE orders.id IS NOT NULL
    `;
		if (school !== '') bodyContent += ` AND schools.id =${school}`;
		// // combo boxes
		if (from !== '' &&
			from !== undefined
			&& until !== ''
			&& until !== undefined) bodyContent += ` AND orders.date BETWEEN '${from}' AND '${until}'`;

		bodyContent += ` ORDER BY orders.date DESC`

		console.log(bodyContent)

		const result = await pool.query(bodyContent);
		return result.rows;
	} catch (e) {
		console.log(e);
	}
};

module.exports = { searchSchools };


// WHERE
// 	customer_id IN(
// 	SELECT customer_id
// 		FROM rental
// 		WHERE CAST(return_date AS DATE) = '2005-05-27'
// )
// ORDER BY customer_id;
