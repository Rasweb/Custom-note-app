import { Database } from "bun:sqlite"
const db = new Database("mydb.sqlite");

/* Alter table
db.run(`
ALTER TABLE table_name ADD COLUMN column_name INTEGER NOT NULL DEFAULT 0;
`)
*/

export const createNoteTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY, 
      title TEXT NOT NULL,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      folder_id INTEGER,
      pin INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (folder_id) REFERENCES folders(id)
      )`
    );
};

export const getAllNotes = () =>{
  const query = db.query("SELECT * FROM notes");
  const result = query.all();
  return result;
};

export const createNote = async (req: Bun.BunRequest) => {
  const body = await req.json(); // Parse the stream into a JSON object
  const { title, content, folder_id} = body;

  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const result = db.run("INSERT INTO notes (title, content, created_at, updated_at, folder_id) VALUES (?, ?, ?, ?, ?)", [title, content, createdAt, updatedAt, folder_id]);
  return {id: result.lastInsertRowid};
};

export const getNote = (currId: number) => {
  const id = currId;
  const query = db.query(`SELECT * FROM notes WHERE id = ?`);
  const result = query.all(id);
  return result;
};

export const updateNote = async (req: Bun.BunRequest) => {
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

export const editNote = async (req: Bun.BunRequest) => {
  const body = await req.json();
  const {id, content} = body;
  const query = db.query (`
    UPDATE notes SET
      content = ?,
      updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING *;
  `);
  const updateNote = query.get(content, id);
  return updateNote;
}

export const editNoteProps = async (req:Bun.BunRequest) => {
  const body = await req.json();
  const {id, title, folder_id} = body;
  const query = db.query(`
    UPDATE notes SET
      title = ?,
      folder_id = ?,
      updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      RETURNING *;  
  `);
  const updateNoteProps = query.get(title, folder_id, id);
  return updateNoteProps;
}

export const deleteNote = (currId: number) => {
  const sql = `DELETE FROM notes WHERE id = :id;`
  const stmt = db.prepare(sql);
  stmt.run(currId);
}