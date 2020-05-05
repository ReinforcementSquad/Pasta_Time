const { Pool } = require("pg");

const PG_URI = process.env.DB_URI || "postgres://efrsoelw:RQ9gYhRsYDdsGwRMtRZamf_pN3p_oR8T@drona.db.elephantsql.com:5432/efrsoelw";

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log(`Executed query: ${text}`);
    return pool.query(text, params, callback);
  }
};
