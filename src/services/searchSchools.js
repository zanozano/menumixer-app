const { pool } = require('../database/config');

const searchSchools = async ({ school, from, until }) => {
	try {
		let bodyContent = `
        SELECT *
        FROM schools 
        FULL OUTER JOIN orders ON schools.id = orders.school_id
        WHERE schools.id IS NOT NULL
    `;
		// combo boxes
		if (school) bodyContent += ` AND schools.id =${school}`;
		// if (from) bodyContent += ` AND orders.date = ${from}`;
		// if (until) bodyContent += ` AND orders.date = ${until}`;
		const result = await pool.query(bodyContent);
		return result.rows;
	} catch (e) {
		console.log(e);
	}
};

module.exports = { searchSchools };
