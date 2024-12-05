"use client"
import {
  Calendar,
  CreditCard,
  Settings,
  Users,
  FileText,
  BarChart,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useTheme } from "next-themes";

// Updated CommandDemo for a professional dashboard
export function CommandDemo() {
  const {theme}=useTheme()
  return (
<Command className={`w-[215px] ${theme === "dark" ? "bg-[hsl(240, 30%, 10%)] text-white" : "bg-white text-black"}`}>
      <CommandInput placeholder="Search or enter command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Group for Dashboard Shortcuts */}
        <CommandGroup heading="Dashboard Shortcuts">
          <CommandItem>
            <BarChart />
            <span>Analytics</span>
          </CommandItem>
          <CommandItem>
            <FileText />
            <span>Reports</span>
          </CommandItem>
          <CommandItem>
            <Users />
            <span>Team Management</span>
          </CommandItem>
        </CommandGroup>

        {/* Separator between groups */}
        <CommandSeparator />

        {/* Group for Account Settings */}
        <CommandGroup heading="Account Settings">
          <CommandItem>
            <Users />
            <span>My Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Account Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        {/* Separator */}
        <CommandSeparator />

        {/* Group for Calendar & Scheduling */}
        <CommandGroup heading="Calendar & Scheduling">
          <CommandItem>
            <Calendar />
            <span>Event Calendar</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
