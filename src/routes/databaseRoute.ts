import { join } from "path";
// named imports
import * as fileRoutes from "./fileRoutes"
import * as folderRoutes from "./folderRoutes"
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
// function addNewColumn(){
  // db.run("ALTER TABLE table_name ADD COLUMN column_name column_type");
// }

function getTables(){
  folderRoutes.createFolderTable();
  fileRoutes.createNoteTable();
}

// process image upload from a form submission
async function handleImageUpload(req: Bun.BunRequest) {
  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!(file instanceof File)) {
    return new Response("No image uploaded", { status: 400 });
  }

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = join(import.meta.dir, "../../images", fileName);
 
  await Bun.write(filePath, file);
  return Response.json({ url: `/images/${fileName}` });
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
    getTables();

    const notes = fileRoutes.getAllNotes();
    return Response.json(notes);
    },

    async POST(req: Bun.BunRequest){
      await fileRoutes.createNote(req);
      return new Response(JSON.stringify({ message: "Note created successfully" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
  "/database/note/:id":{
    async GET(req: Bun.BunRequest){
    const id = idFix(req);
    const note = await fileRoutes.getNote(id);
    return Response.json(note);
    },
    async PUT(req: Bun.BunRequest){
      const updatedNote = await fileRoutes.updateNote(req);
      return new Response(JSON.stringify(updatedNote), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
    async DELETE(req: Bun.BunRequest){
      const id = idFix(req);
      await fileRoutes.deleteNote(id);
      return Response.json("Removed note");
    }
  },
  // Image upload route
  "/upload/image": {
    async POST(req: Bun.BunRequest) {
      return handleImageUpload(req);
    }
  },
  // Handle image paths
  "/images/*":(req:Bun.BunRequest) => {
    const path = new URL(req.url).pathname;
    const decodedPath = decodeURIComponent(path);
    return new Response(Bun.file(`.${decodedPath}`));
  },
  "/database/folders": {
    async GET(req:  Bun.BunRequest) {
    // Create table if it dosent exist
    getTables();

    const folders = folderRoutes.getAllFolders();
    return Response.json(folders);
    },

    async POST(req: Bun.BunRequest){
      await folderRoutes.createFolder(req);
      return new Response(JSON.stringify({ message: "Folder created successfully" }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};

