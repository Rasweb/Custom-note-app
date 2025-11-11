import { Database } from "bun:sqlite"
import { join } from "path";
// Open connection to sqlite database
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
// For adding new columns
function addNewColumn(){
  // db.run("ALTER TABLE table_name ADD COLUMN column_name column_type");
}

function createTable(){
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY, 
      title TEXT NOT NULL,
      content TEXT,
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
  const { title, content} = body;
  db.run("INSERT INTO notes (title, content) VALUES (?, ?)", [title, content]);
};

function getNote(currId: number){
  const id = currId;
  const query = db.query(`SELECT * FROM notes WHERE id = ?`);
  const result = query.all(id);
  return result;
};

async function updateNote(req: Bun.BunRequest){
  const body = await req.json();
  const { id, title, content } = body;
  const query = db.query(`
    UPDATE notes SET 
      title = ?, 
      content = ?, 
      updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
      RETURNING *;
  `);   
  const updatedNote = query.get(title, content, id);
  return updatedNote;
};

function deleteNote(currId: number){
  const noteId = currId;
  const sql = `DELETE FROM notes WHERE id = :id;`
  const stmt = db.prepare(sql);
  stmt.run(noteId);
}

// process image upload from a form submission
async function handleImageUpload(req: Bun.BunRequest) {
  const formData = await req.formData();
  const file = formData.get("image");

  if (!(file instanceof File)) {
    return new Response("No image uploaded", { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const fileName = `${Date.now()}-${file.name}`;
  const dirPath = join("static", "images");
  const filePath = join(dirPath, fileName);

  await Bun.write(filePath, Buffer.from(buffer));
  return Response.json({ url: `/uploads/${fileName}` });
}

async function serveStatic(req: Request) {
  const url = new URL(req.url);
  const filePath = join("static", "images", url.pathname.replace("/uploads/", ""));
  try {
    const file = Bun.file(filePath);
    if (!(await file.exists())) throw new Error("Not found");
    return new Response(file);
  } catch {
    return new Response("File not found", { status: 404 });
  }
}

// handle the id:  :1
function idFix(req: Bun.BunRequest){
  const rawId = (req.params as { id: string }).id;
  const id = Number(rawId.replace(/^:/, ''));

  return id;
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
    const id = idFix(req);
    const note = await getNote(id);
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
      const id = idFix(req);
      await deleteNote(id);
      return Response.json("Removed note");
    }
  },
  "/upload/image": {
    async POST(req: Bun.BunRequest) {
      return handleImageUpload(req);
    }
  },

  "/uploads/:filename": {
    async GET(req: Bun.BunRequest) {
      return serveStatic(req);
    }
  },
};

