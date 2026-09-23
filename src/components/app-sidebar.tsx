import { BookOpen, Home, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router";

import { currentUser } from "@/lib/mock-data";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "ลงทะเบียนเรียน", url: "/enrollment", icon: BookOpen },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border bg-white text-foreground dark:border-white/10 dark:bg-[#111111] dark:text-white">
      <SidebarHeader className="border-b border-border px-3 py-3 dark:border-white/10">
        <div className="px-2 py-1 text-sm font-semibold">CPE &amp; ISNE</div>
      </SidebarHeader>
      <SidebarContent className="bg-white px-3 py-3 dark:bg-[#111111]">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs uppercase tracking-wide text-muted-foreground dark:text-white/50">
            เมนูหลัก
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    render={<Link to={item.url} />}
                    className={
                      location.pathname === item.url
                        ? "bg-black/5 text-foreground dark:bg-white/10 dark:text-white"
                        : "text-muted-foreground hover:bg-black/5 hover:text-foreground dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-white"
                    }
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className="mt-auto flex items-center gap-3 border-t border-border px-3 py-3 dark:border-white/10">
        <img
          src={currentUser.avatar}
          alt={currentUser.nickname}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="min-w-0 leading-tight">
          <div className="truncate text-sm font-medium text-foreground dark:text-white">
            {currentUser.nickname}
          </div>
          <div className="inline-flex h-5 items-center justify-center rounded-full border border-border bg-muted px-2 text-[10px] font-medium uppercase tracking-[0.08em] text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white/60">
            {currentUser.role}
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
