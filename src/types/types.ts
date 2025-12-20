import type { Dispatch, SetStateAction } from "react";

export type AppSidebarProps = {
  folderCount: number;
  notesCount: number;
  folders: FolderType[];
  notes: NoteType[];
};

export type FolderType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type NoteType = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
  content:string;
  folder_id: number;
  pin: number
};


export type FolderProps = {
  setFolders: Dispatch<SetStateAction<never[]>>;
}

export type NoteProps ={
  setNotes: Dispatch<SetStateAction<NoteType[]>>;
}

export type EditNotePropsType = {
  title: string,
  folder: string
}

export type errorHandleProps = {
  bool: boolean,
  msg: string
}