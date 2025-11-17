import { SidebarProvider, SidebarTrigger, useSidebar  } from "@/components/sidebar/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { useState } from "react";
 
export default function Layout({ children }: { children: React.ReactNode }) {
    const [folderCount, setFolderCount] = useState(0);
    const [folders, setFolders] = useState([]);
    const [notesCount, setNotesCount] = useState(0);
    const [notes, setNotes] = useState([]);
  function MobileSidebarTrigger() {
    const { isMobile } = useSidebar()
    
    function handleClick(){
      console.log("Sidebar btn pressed");
      getFolders();
      getNotes();
    }
     return isMobile ? <SidebarTrigger onClick={handleClick} /> : null
  }
  async function getFolders(){
    const foldersURL = "/database/folders";
    try {
      const response = await fetch(foldersURL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      setFolderCount(data.length);
      setFolders(data);
      console.log("Data", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch folders", error);
    }
  };

  async function getNotes(){
    const notesURL = "/database/notes";
    try{
      const response = await fetch(notesURL, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      setNotesCount(data.length);
      setNotes(data);
      return data;
    } catch(error){
      console.error("Failed to fetch notes:", error);
    }
  };


  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-screen">
        <AppSidebar folderCount={folderCount} notesCount={notesCount} folders={folders} notes={notes}/>
        <main className="flex-1 overflow-auto">
          <MobileSidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

