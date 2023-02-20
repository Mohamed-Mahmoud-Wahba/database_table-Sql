const express = require("express");
const pg = require("pg");
const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "social",
  user: "postgres",
  password: "12345678",
});
const app = express();
app.use(express.urlencoded({ extended: true }));
app.get("/posts", async (req, res) => {
  const { rows } = await pool.query(`
SELECT * FROM posts;
  `);
  console.log(rows);
  res.send(`
  <div style="justify-content: center; display: grid; padding-top: 50px; font-family: sans-serif;">
      <form method="POST">
        <h3 style="color: cadetblue;">Create Post</h3>
        <div>
          <label style="color: cadetblue;">Lng</label><br>
          <input name="lng" style="margin-top: 10px; padding: 11px; width: 411px; border: 1px solid forestgreen;"/>
        </div>
        <div  style="margin-top: 10px;">
          <label style="color: cadetblue;">Lat</label><br>
          <input name="lat" style="margin-top: 10px; padding: 11px; width: 411px; border: 1px solid forestgreen;"/>
        </div>
        <button type="submit" style="color: cadetblue; margin-top: 24px; background-color: transparent; border: 1px solid forestgreen; padding: 8px 15px 8px 15px; width: 130px;">Create</button>
    </form>
    <table>
      <thead>
        <tr style="background: #eee; color: cadetblue;">
          <th style="border: 2px dashed lightgray; padding: 10px 23px 10px 23px; margin-left="15px">Id</th>
          <th style="border: 2px dashed lightgray; padding: 10px 23px 10px 23px; margin-left="15px">Lng</th>
          <th style="border: 2px dashed lightgray; padding: 10px 23px 10px 23px; margin-left="15px">Lat</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map((row) => {
            return `
           <tr>
             <td style="border-bottom: 2px dashed lightgray; border-left: 2px dashed lightgray;  width: 130px;  border-right: 2px dashed lightgray; text-align: center; padding: 9px 0 7px 0;">${row.id}</td>
             <td style="border-bottom: 2px dashed lightgray; border-left: 2px dashed lightgray;  width: 130px;  border-right: 2px dashed lightgray; text-align: center; padding: 9px 0 7px 0;">${row.loc.x}</td>
             <td style="border-bottom: 2px dashed lightgray; border-left: 2px dashed lightgray;  width: 130px;  border-right: 2px dashed lightgray; text-align: center; padding: 9px 0 7px 0;">${row.loc.y}</td>
           </tr>
          `;
          })
          .join("")}
      </tbody>
    </table>
    </div>
  `);
});
app.post("/posts", async (req, res) => {
  const { lng, lat } = req.body;
  await pool.query("INSERT INTO posts (loc) VALUES ($1);", [
    `(${lng}, ${lat})`,
  ]);
  res.redirect("/posts");
});
app.listen(3005, () => {
  console.log("listening on port 3005");
});
