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
        {folders.length ?
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
                      {notes.length ? 
                      <>
                        {notes.map((note: NoteType) => (
                          <SidebarMenuSub key={note.id}>
                            {note.folder_id == folder.id ? <>{note.title}</>: <></>}
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
