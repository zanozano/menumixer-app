var moment = require('moment'); // require
const { pool } = require('../database/config');

const searchSchools = async ({ school, from, until }) => {

	try {
		let bodyContent = `
        SELECT * FROM schools FULL OUTER JOIN orders ON schools.id = orders.school_id
    `;
		// combo boxes
		if (from !== '' && until !== '') bodyContent += ` WHERE orders.date BETWEEN '${from}' AND '${until}'`;
		if (school !== '') bodyContent += ` AND schools.id =${school}`;
		bodyContent += ` ORDER BY orders.date DESC`
		console.log(bodyContent)
		const result = await pool.query(bodyContent);
		return result.rows;
	} catch (e) {
		console.log(e);
	}
};

module.exports = { searchSchools };
