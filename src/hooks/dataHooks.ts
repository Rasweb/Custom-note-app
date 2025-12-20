import * as Types from "@/types/types"
import type { Dispatch, SetStateAction } from "react";
import type { NavigateFunction } from "react-router-dom";

export const getFolders = async ({setFolders}: Types.FolderProps) => {
    const foldersURL = "/database/folders";
    try {
      const response = await fetch(foldersURL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      setFolders(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch folders", error);
    }
};

export const getNotes = async ({setNotes}:Types.NoteProps) => {
    const notesURL = "/database/notes";
    try{
      const response = await fetch(notesURL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      setNotes(data);
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

export const getNoteById = async (id: number, setNote: Dispatch<SetStateAction<Types.NoteType | undefined>>) => {
  try{
    const response = await fetch(`/database/note/${id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    const data = await response.json();
    setNote(data[0]);
    }
    catch(error){
      console.error("Failed to fetch notes:", error);
    }
}; 

export const getFolderById = async (id: number, setFolder: Dispatch<SetStateAction<Types.FolderType | undefined>>) => {
  try {
    const response = await fetch(`/database/folder/${id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    const data = await response.json();
    setFolder(data[0]);
  } catch (error) {
    console.error("Failed to fetch notes: ", error); 
  }
}

export const updateNoteProps = async (note: Types.NoteType, formVals: Types.EditNotePropsType ) => {
  try {
    const response = await fetch(`/database/note/props/${note.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        id: note.id,
        title: formVals.title,
        folder_id: formVals.folder ? parseInt(formVals.folder) : null
      }),
    });
      if(response.ok){
        console.log("Note props update success");
        // TODO - fix in future, update data state instead
        //  window.location.reload(); 
        return response.json();
      }
  } catch (error) {
    console.error("Failed to update note props: ", error);
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


export const createNoteFunc = async (formVals: Types.EditNotePropsType, navigate: NavigateFunction, setErrorHandle: Dispatch<SetStateAction<Types.errorHandleProps>>) => {
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
          setErrorHandle({bool: true, msg: error.message});
      } else {
          console.error("Unknown error:", error);
          setErrorHandle({bool: true, msg: String(error)});
      }
  }
};


export const changePinMode = async (note_id: number, pin: number, onPinChange: (id: number, newPin: number) => void) => {
  let newPin;
  // Changes the newPin value
  newPin = pin === 1 ? 0 : 1;

  try {
    const response = await fetch(`/database/note/pin/${note_id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
          pin: newPin,
          id: note_id,
      }),
    });
    if(response.ok){
      console.log("Pin changed successfully");
      onPinChange(note_id, newPin);
    }
  } catch (error) {
      console.error("Failed to change pin mode: ", error);
  }
}