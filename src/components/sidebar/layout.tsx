import { SidebarProvider, SidebarTrigger, useSidebar  } from "@/components/sidebar/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
 
function MobileSidebarTrigger() {
  const { isMobile } = useSidebar()
  return isMobile ? <SidebarTrigger /> : null
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        {/* UI Testing:  bg-green-500 */}
        <main className="flex-1 overflow-auto">
          <MobileSidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

