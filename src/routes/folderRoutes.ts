import { Database } from "bun:sqlite"
const db = new Database("mydb.sqlite");

export const createFolderTable = () => {
    db.run(`
    CREATE TABLE IF NOT EXISTS folders (
      id INTEGER PRIMARY KEY, 
      name TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export const getAllFolders = () => {
  const query = db.query("SELECT * FROM folders");
  const result = query.all();
  return result
};

export const createFolder = async (req: Bun.BunRequest) => {
  // Parse into json object
  const body = await req.json(); 
  const {name} = body;
  // Insert the folder with the current timestamp
  const createdAt = new Date().toISOString(); 
  db.run("INSERT INTO folders (name, created_at, updated_at) VALUES (?, ?, ?)", [name, createdAt, createdAt]);
}