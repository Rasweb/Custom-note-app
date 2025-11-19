import { SidebarProvider, SidebarTrigger, useSidebar  } from "@/components/sidebar/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { useState } from "react";
import { getFolders, getNotes } from "@/hooks/dataHooks";
 
export default function Layout({ children }: { children: React.ReactNode }) {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  function MobileSidebarTrigger() {
    const { isMobile } = useSidebar()
    
    function handleClick(){
      getFolders({setFolders});
      getNotes({setNotes});
    }
     return isMobile ? <SidebarTrigger onClick={handleClick} /> : null
  }

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

