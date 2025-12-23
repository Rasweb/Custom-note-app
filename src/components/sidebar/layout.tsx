import { SidebarProvider, SidebarTrigger, useSidebar  } from "@/components/sidebar/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { useEffect, useState } from "react";
import * as dataHooks from "@/hooks/dataHooks"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  function MobileSidebarTrigger() {
    const { isMobile } = useSidebar()
    
    function handleClick(){
      fetchFolders();
      fetchNotes();
    }
     return isMobile ? <SidebarTrigger onClick={handleClick} /> : null
  }

  const fetchFolders = async() => {
    try {
      const response = await dataHooks.getFolders();
      setFolders(response);
    } catch (error) {
      console.error("Failed to fetch folders: ", error);
    }
  }

  const fetchNotes = async () => {
    try {
      const response = await dataHooks.getNotes();
      setNotes(response);
    } catch (error) {
      console.error("Failed to fetch notes: ", error);
    }
  }

  useEffect(() => {
    fetchNotes();
    fetchFolders();
  }, []); // [] ensures it only runs once on mount.

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-screen">
        <AppSidebar folderCount={folders.length} notesCount={folders.length} folders={folders} notes={notes}/>
        <main className="flex-1 overflow-auto">
          <MobileSidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

