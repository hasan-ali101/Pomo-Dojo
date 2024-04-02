import { useState, useEffect } from "react";

const Timer: React.FC<{
  minutes: number;
  active: boolean;
  setActive: any;
  setMinutes: any;
  seconds: number;
  setSeconds: any;
}> = ({ minutes, active, setActive, setMinutes, seconds, setSeconds }) => {
  let intervalId: NodeJS.Timeout;

  useEffect(() => {
    if (active) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(intervalId);
            setActive(false);
          } else {
            setMinutes((prevMinutes: number) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds: number) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [active, minutes, seconds]);

  return (
    <div className="flex flex-col items-center justify-around bg-slate-100 dark:text-white dark:bg-slate-800 border-t-2">
      <div className="font-semibold text-3xl flex justify-center p-6 h-full ">
        <span>
          {minutes >= 10 ? minutes.toString() : "0" + minutes.toString()}:
        </span>
        <span>
          {seconds >= 10 ? seconds.toString() : "0" + seconds.toString()}
        </span>
      </div>
    </div>
  );
};

export default Timer;
