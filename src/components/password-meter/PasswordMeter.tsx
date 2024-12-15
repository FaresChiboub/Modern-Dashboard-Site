"use client";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
interface PasswordMeterProps {
  score: number | null;
}
const PasswordMeter:React.FC<PasswordMeterProps>  = ({ score }) => {
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
