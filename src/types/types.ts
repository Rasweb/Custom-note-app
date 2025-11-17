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
};