import * as Types from "@/types/types"
import type { NavigateFunction } from "react-router-dom";

export const getFolders = async () => {
    const foldersURL = "/database/folders";
    try {
      const response = await fetch(foldersURL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch folders", error);
    }
};

export const getNotes = async () => {
    const notesURL = "/database/notes";
    try{
      const response = await fetch(notesURL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      return data;
    } catch(error){
      console.error("Failed to fetch notes:", error);
    }
};

export const deleteNoteById = async (id: number, navigate: NavigateFunction) => {
  // const navigate = useNavigate();
  const usrin = prompt("Are you sure you wish to remove this note?[y/n]:");
    if(usrin == "y"){
      try{
        const response = await fetch(`/database/note/:${id}` ,{
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
        });
        if(response.ok){
          navigate("/");
        }
        return await response.json();
      }
      catch(error){
        console.error("Failed to fetch notes:", error);
      }
    } else {
      return;
    }
  };

export const getNoteById = async (id: number) => {
  try{
    const response = await fetch(`/database/note/${id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    const data = await response.json();
    return data[0];
    }
    catch(error){
      console.error("Failed to fetch notes:", error);
    }
}; 

export const getFolderById = async (id: number) => {
  try {
    const response = await fetch(`/database/folder/${id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Failed to fetch notes: ", error); 
  }
}

export const createFolderFunc = async (name: string,  navigate: NavigateFunction) => {
  console.log("Create folder func pressed");
  try {
    const response = await fetch("/database/folders", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          name: name,
      })
    });
    if(response.ok){
      navigate("/", {state: {message: "Create folder: success"}});
    }
    return await response.json();
  } catch (error) {
      if(error instanceof Error){
        console.error("Failed to create folder:", error.message);
        // error handling
      } else {
        console.error("Unknown error:", error);
        // error handling
      }
  }
};


export const createNoteFunc = async (formVals: Types.EditNotePropsType, navigate: NavigateFunction) => {
  let val;
  try{
      if(formVals.folder == "none" || formVals.folder == "") {
          val = null    
      } else {
          val = formVals.folder;
      }
      const response = await fetch("/database/notes",{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
              title: formVals.title,
              content: "# Title",
              folder_id: val,
          })
      });
      const data = await response.json();
      if(response.ok){
          navigate(`/note/${data.id}`);
      }
      return data;
  }
  catch(error){
      if(error  instanceof Error){
          console.error("Failed to create note:", error.message);
          return {
            bool: true,
            msg:error.message
          }
      } else {
          console.error("Unknown error:", error);
          return {
            bool: true,
            msg:String(error)
          }
      }
  }
};

export const editNote = async(updatedNote: Types.NoteType, note_id: number, onNoteUpdated:(note:Types.NoteType) => void) => {
  try {
    const response = await fetch(`/database/note/${note_id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedNote),
    });
    if(response.ok){
        const savedNote = await response.json();
        onNoteUpdated(savedNote);
    }
  } catch (error) {
      console.error("Failed to update note: ", error);            
  }
}