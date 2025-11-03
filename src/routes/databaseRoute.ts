import { Database } from "bun:sqlite"
// Open connectio to sqlite database
const db = new Database("mydb.sqlite");

/* Bun SQLite
- Info
  - https://bun.com/docs/runtime/sqlite
  - https://bun.com/reference/bun/sqlite
- create table
  - db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, name TEXT, other TEXT)");
- insert into table
    - db.run("INSERT INTO notes (name, other) VALUES (?, ?)", ["test", "testing"]);
- read all from table
  - const query = db.query("SELECT * FROM notes");
  - const result = query.all();
  - return Response.json(result);
- close database
  - db.close(false);
- remove from database
  - const sql = `DELETE FROM notes WHERE id = :id;`
  - const stmt = db.prepare(sql);
  - stmt.run("test");
- Delete entire table
  - db.run("DROP TABLE notes");
*/

export const databaseRoute = {
  "/database": {
    async GET(req:  Bun.BunRequest) {

    return Response.json("hello");
    },
  },
};
