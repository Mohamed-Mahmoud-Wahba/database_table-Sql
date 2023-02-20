const pg = require("pg");
const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "social",
  user: "postgres",
  password: "12345678",
});

pool.query(`
UPDATE posts
SET loc = POINT(lng, lat)
WHERE loc IS NULL;
`)
  .then(() => {
    console.log('Update complete');
    pool.end();
  })
  .catch((err) => console.error(err.message));
