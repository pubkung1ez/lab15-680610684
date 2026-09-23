import { Outlet } from "react-router";

import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { currentStudent, currentUser } from "@/lib/mock-data";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-10 items-center justify-between gap-2 border-b px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm font-medium">ระบบลงทะเบียนเรียน</span>
          </div>
          <ModeToggle />
        </header>
        <main className="flex min-h-0 flex-1 flex-col p-3">
          <div className="min-h-0 flex-1">
            <Outlet />
          </div>
          <footer className="-mx-3 mt-3 flex h-8 items-center justify-center border-t border-border text-[10px] text-muted-foreground dark:border-white/10 dark:text-white/60">
            จัดทำโดย {currentUser.nickname} Murphy รหัสนักศึกษา {currentStudent.studentId}
          </footer>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
