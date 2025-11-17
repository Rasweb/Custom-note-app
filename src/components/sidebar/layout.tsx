import { SidebarProvider, SidebarTrigger, useSidebar  } from "@/components/sidebar/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { useState } from "react";
import { getFolders, getNotes } from "@/hooks/dataHooks";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  const [folderCount, setFolderCount] = useState(0);
  const [folders, setFolders] = useState([]);
  const [noteCount, setNoteCount] = useState(0);
  const [notes, setNotes] = useState([]);
  function MobileSidebarTrigger() {
    const { isMobile } = useSidebar()
    
    function handleClick(){
      console.log("Sidebar btn pressed");
      getFolders({setFolderCount, setFolders});
      getNotes({setNoteCount, setNotes});
    }
     return isMobile ? <SidebarTrigger onClick={handleClick} /> : null
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-screen">
        <AppSidebar folderCount={folderCount} notesCount={noteCount} folders={folders} notes={notes}/>
        <main className="flex-1 overflow-auto">
          <MobileSidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

