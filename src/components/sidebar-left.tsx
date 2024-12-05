"use client";

import * as React from "react";
import {
  Command,
  AudioWaveform,
  Home,
  Inbox,
  Search,
  Sparkles,
  Calendar,
  Settings2,
  Blocks,
  Trash2,
  MessageCircleQuestion,
} from "lucide-react";
import { CommandDemo } from "./command";
import { NavFavorites } from "@/components/nav-favorites";
import { NavSecondary } from "@/components/nav-secondary";
import { NavWorkspaces } from "@/components/nav-workspaces";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  teams: [
    {
      name: "Data Analytics Team",
      logo: Command,
      plan: "Enterprise",
      metrics: {
        totalRevenue: "$5M",
        totalUsers: "150,000",
        activeProjects: 12,
        growthRate: "15%",
      },
    },
    {
      name: "Marketing Insights",
      logo: AudioWaveform,
      plan: "Business",
      metrics: {
        totalRevenue: "$1.5M",
        totalLeads: "10,000",
        conversionRate: "2.5%",
        adSpend: "$200K",
      },
    },
    {
      name: "Product Team",
      logo: Command,
      plan: "Startup",
      metrics: {
        totalUsers: "50,000",
        activeFeatures: 5,
        churnRate: "8%",
        monthlyGrowth: "10%",
      },
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Search,
    },
    {
      title: "Reports",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "KPIs",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Real-Time Data",
      url: "#",
      icon: Inbox,
    },
  ],
  navSecondary: [
    {
      title: "Analytics Overview",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Data Sources",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Integrations",
      url: "#",
      icon: Blocks,
    },
    {
      title: "User Insights",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Settings",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  favorites: [
    {
      name: "Sales Performance Dashboard",
      url: "#",
      emoji: "💼",
    },
    {
      name: "Customer Retention Metrics",
      url: "#",
      emoji: "🔄",
    },
    {
      name: "Product Usage & Engagement",
      url: "#",
      emoji: "📉",
    },
    {
      name: "Marketing ROI & Analytics",
      url: "#",
      emoji: "📈",
    },
    {
      name: "Financial Overview & Profit Margins",
      url: "#",
      emoji: "💰",
    },
    {
      name: "Customer Feedback & Satisfaction",
      url: "#",
      emoji: "📝",
    },
  ],
  workspaces: [
    {
      name: "Sales Analytics",
      emoji: "💼",
      pages: [
        {
          name: "Sales Performance Overview",
          url: "#",
          emoji: "📊",
        },
        {
          name: "Lead Generation & Funnel",
          url: "#",
          emoji: "🔍",
        },
        {
          name: "Revenue Forecasting",
          url: "#",
          emoji: "📈",
        },
      ],
    },
    {
      name: "Customer Analytics",
      emoji: "👥",
      pages: [
        {
          name: "Customer Lifetime Value (CLV)",
          url: "#",
          emoji: "💎",
        },
        {
          name: "Churn Rate & Retention",
          url: "#",
          emoji: "🔄",
        },
        {
          name: "Customer Segmentation",
          url: "#",
          emoji: "📊",
        },
      ],
    },
    {
      name: "Marketing Analytics",
      emoji: "📈",
      pages: [
        {
          name: "Ad Campaign Performance",
          url: "#",
          emoji: "💡",
        },
        {
          name: "SEO & Traffic Insights",
          url: "#",
          emoji: "🔍",
        },
        {
          name: "Email Marketing Analytics",
          url: "#",
          emoji: "📧",
        },
      ],
    },
    {
      name: "Product Analytics",
      emoji: "🔧",
      pages: [
        {
          name: "Feature Usage Metrics",
          url: "#",
          emoji: "⚙️",
        },
        {
          name: "User Engagement & Retention",
          url: "#",
          emoji: "📊",
        },
        {
          name: "A/B Testing Results",
          url: "#",
          emoji: "🧪",
        },
      ],
    },
    {
      name: "Financial Analytics",
      emoji: "💰",
      pages: [
        {
          name: "Profit & Loss Statement",
          url: "#",
          emoji: "📊",
        },
        {
          name: "Budgeting & Expense Tracking",
          url: "#",
          emoji: "💸",
        },
        {
          name: "Financial Forecasting",
          url: "#",
          emoji: "📉",
        },
      ],
    },
  ],
};

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <CommandDemo />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
