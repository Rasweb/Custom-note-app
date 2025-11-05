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

INFO
- db.run()
  - When returned data is not needed.
- db.query()
  - When returned data is needed.
- RETURNING * clause
  - Fetches the rows that where modified by the UPDATE satement.
  - Return rows that match the WHERE clause.
*/

function createTable(){
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY, 
      title TEXT NOT NULL,
      content TEXT,
      image_link TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);
};

function getAllNotes(){
  const query = db.query("SELECT * FROM notes");
  const result = query.all();
  return result;
};

async function createNote(req: Bun.BunRequest){
  const body = await req.json(); // Parse the stream into a JSON object
  const { title, content, imageLink } = body;
  db.run("INSERT INTO notes (title, content, image_link) VALUES (?, ?, ?)", [title, content, imageLink]);
};

function getNote(){
  const id = 1;
  const query = db.query(`SELECT * FROM notes WHERE id = ?`);
  const result = query.all(id);
  return result;
};

async function updateNote(req: Bun.BunRequest){
  const body = await req.json();
  const { id, title, content, imageLink } = body;
  const query = db.query(`
    UPDATE notes SET 
      title = ?, 
      content = ?, 
      image_link = ?, 
      updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
      RETURNING *;
  `);   
  const updatedNote = query.get(title, content, imageLink, id);
  return updatedNote;
};

function deleteNote(){
  const noteId = 1;
  const sql = `DELETE FROM notes WHERE id = :id;`
  const stmt = db.prepare(sql);
  stmt.run(noteId);
}

export const databaseRoute = {
  "/database/notes": {
    async GET(req:  Bun.BunRequest) {
    // Create table if it dosent exist
    createTable();

    const notes = getAllNotes();
    return Response.json(notes);
    },

    async POST(req: Bun.BunRequest){
      await createNote(req);
      return new Response(JSON.stringify({ message: "Note created successfully" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
  "/database/note/:id":{
    async GET(req: Bun.BunRequest){
      const note = getNote();
      return Response.json(note);
    },
    async PUT(req: Bun.BunRequest){
      const updatedNote = await updateNote(req);
      return new Response(JSON.stringify(updatedNote), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
    async DELETE(req: Bun.BunRequest){
      deleteNote();
      return Response.json("Removed note");
    }
  },
};

