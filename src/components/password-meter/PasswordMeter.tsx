"use client";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

const PasswordMeter = ({ score }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (score === null || score === undefined) {
      setProgress(0);
    } else {
      setProgress(score * 25);
    }
  }, [score]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-0">
        <Progress value={progress} className="w-full" />
      </div>
    </div>
  );
};

export default PasswordMeter;
