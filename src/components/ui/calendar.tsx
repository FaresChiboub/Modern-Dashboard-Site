"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayClickEventHandler } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // Initialize state with the value from localStorage (if available)
  const [selectedDay, setSelectedDay] = React.useState<Date | null>(() => {
    const storedDate = localStorage.getItem("selectedDay");
    return storedDate ? new Date(storedDate) : null;
  });

  // Save to localStorage whenever the selected day changes
  React.useEffect(() => {
    if (selectedDay) {
      localStorage.setItem("selectedDay", selectedDay.toISOString());
    } else {
      localStorage.removeItem("selectedDay");
    }
  }, [selectedDay]);

  // Handler for day click
  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    if (modifiers.selected) {
      setSelectedDay(null); // Deselect if clicked again
    } else {
      setSelectedDay(day); // Select the clicked day
    }
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      selected={selectedDay}
      onDayClick={handleDayClick}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal",
          // Apply black and bold style to the selected day
          "aria-selected:bg-black aria-selected:text-white aria-selected:font-bold"
        ),
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
