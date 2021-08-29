const pg = require("pg");
const pool = new pg.Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.db,
  password: process.env.pass,
  port: 5432,
});

async function query(q) {
  const client = await pool.connect();
  let res;

  try {
    res = await client.query(q);
  } catch (err) {
    throw err;
  } finally {
    client.release();
  }
  return res;
}

exports.handler = async (event: any, context: any, callback: any) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    const { rows } = await query("select * from person");
    console.log(JSON.stringify(rows[0]));
    var response = {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rows),
      isBase64Encoded: false,
    };
    callback(null, response);
  } catch (err) {
    console.log("Database Error: " + err);
  }
};
