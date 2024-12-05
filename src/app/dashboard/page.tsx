"use client";
import { SidebarLeft } from "@/components/sidebar-left";
import { SidebarRight } from "@/components/sidebar-right";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DonutChart1 } from "@/components/DonutChart1";
import { RadarChart1 } from "@/components/RadarChart1";
import { BarChartComponent } from "@/components/BarChart1";
import { LargeAreaChart } from "@/components/large-areaChart";
import CountUp from "react-countup";
import { Box, DollarSign, TrendingUp } from "lucide-react";
import { LinearChart1 } from "@/components/linearChart1";
import { LineChart2 } from "@/components/linearChart2";
import { LinearChart3 } from "@/components/linearChart3";
import { LineChart4 } from "@/components/linearChart4";
import { TableComp } from "@/components/tableComp";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";
import { RadialChart2 } from "@/components/radialChart2";

export default function Page() {
  const { theme } = useTheme();

  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <header
          className={`sticky top-0 flex h-14 shrink-0 items-center gap-2`}
        >
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-5">
            <ModeToggle />
          </div>
        </header>

        <div className={`flex flex-col gap-4 p-4`}>
          {/* Cards Section */}
          <div className="grid grid-cols- md:grid-cols-2  gap-4">
            {/* Revenue Card */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-blue-900/30 text-white"
                  : "bg-white text-black"
              } aspect-auto flex flex-col justify-between p-6 rounded-xl shadow-md`}
            >
              <div className="flex justify-between items-center">
                <h6 className="text-uppercase text-sm mt-2">Revenue</h6>
                <DollarSign className="text-4xl" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="my-3 text-3xl font-semibold">
                  <CountUp
                    start={0}
                    end={25467}
                    duration={2.5}
                    separator=","
                    prefix="$"
                  />
                </h3>
                <LineChart2 />
              </div>
              <div className="flex items-center">
                <span className="badge bg-success me-2 text-sm">+15%</span>
                <span className="text-sm">From previous period</span>
              </div>
            </div>

            {/* Orders Card */}

            <div
              className={`${
                theme === "dark"
                  ? "bg-blue-900/30 text-white"
                  : "bg-white text-black"
              } aspect-auto flex flex-col justify-between p-6 rounded-xl shadow-md`}
            >
              <div className="flex justify-between items-center">
                <h6 className="text-uppercase text-sm mt-2">Orders</h6>
                <Box className="text-4xl" />
              </div>

              <h3 className="my-3 text-3xl font-semibold">
                <div className="flex justify-between items-center">
                  <CountUp start={0} end={1587} duration={2.5} separator="," />
                  <LinearChart1 />
                </div>
              </h3>

              <div className="flex items-center">
                <span className="badge bg-success me-2 text-sm">+11%</span>
                <span className="text-sm">From previous period</span>
              </div>
            </div>

            {/* Average Price Card */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-blue-900/30 text-white"
                  : "bg-white text-black"
              } aspect-auto flex flex-col justify-between p-6 rounded-xl shadow-md`}
            >
              <div className="flex justify-between items-center">
                <h6 className="text-uppercase text-sm mt-2">Average Price</h6>
                <TrendingUp className="text-4xl" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="my-3 text-3xl font-semibold">
                  <CountUp
                    start={0}
                    end={160}
                    duration={2.5}
                    separator=","
                    prefix="$"
                  />
                </h3>
                <LinearChart3 />
              </div>
              <div className="flex items-center">
                <span className="badge bg-success me-2 text-sm">+8%</span>
                <span className="text-sm">From previous period</span>
              </div>
            </div>

            {/* Revenue Target Card (Second Card) */}
            <div
              className={`${
                theme === "dark"
                  ? "bg-blue-900/30 text-white"
                  : "bg-white text-black"
              } aspect-auto flex flex-col justify-between p-6 rounded-xl shadow-md`}
            >
              <div className="flex justify-between items-center">
                <h6 className="text-uppercase text-sm mt-2">Revenue Target</h6>
                <DollarSign className="text-4xl" />
              </div>
              <div className="flex justify-between items-center">
                <h3 className="my-3 text-3xl font-semibold">
                  <CountUp
                    start={0}
                    end={30000}
                    duration={2.5}
                    separator=","
                    prefix="$"
                  />
                </h3>
                <LineChart4 />
              </div>
              <div className="flex items-center">
                <span className="badge bg-danger me-2 text-sm">-5%</span>
                <span className="text-sm">Under target</span>
              </div>
            </div>
          </div>

          {/* Graph Section */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 m gap-4 mt-6">
            <div className="rounded-xl h-64">
              <DonutChart1 />
            </div>
            <div className="rounded-xl h-64">
              <RadarChart1 />
            </div>
            <div className="rounded-xl h-64 ">
              <BarChartComponent />
            </div>
            <div>
              <RadialChart2 />
            </div>
          </div>

          <div className="flex-1 rounded-xl md:min-h-min" />
          <LargeAreaChart />
        </div>
        <div>
          <TableComp />
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
