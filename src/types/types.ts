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
};

export type FolderProps = {
  setFolderCount:  Dispatch<SetStateAction<number>>;
  setFolders: Dispatch<SetStateAction<never[]>>;
}

export type NoteProps ={
  setNoteCount:  Dispatch<SetStateAction<number>>;
  setNotes: Dispatch<SetStateAction<never[]>>;
}