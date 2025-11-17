import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/sidebar/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronUp } from "lucide-react";
import type { AppSidebarProps, FolderType, NoteType } from "../../types/types";

export function AppSidebar({folderCount, notesCount, folders, notes}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        {folderCount ?
          <>
            {folders.map((folder:FolderType) => (
              <SidebarMenu key={folder.id}>
                <Collapsible className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between w-full">
                        <span>{folder.name}</span>
                        <ChevronUp className="ml-2 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {notesCount ? 
                      <>
                        {notes.map((note: NoteType) => (
                          <SidebarMenuSub key={note.id}>
                            {note.title}
                            {note.folder_id}
                          </SidebarMenuSub>
                        ))}
                      </>:
                          <SidebarMenuSub>
                            No notes found
                          </SidebarMenuSub>
                      }
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            ))}
          </> :
          <>
            No folders found 
          </>
        }
    </SidebarContent>
    <SidebarFooter />
</Sidebar>
  )
}
