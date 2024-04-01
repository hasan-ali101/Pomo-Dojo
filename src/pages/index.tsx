import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import Timer from "@/components/Timer";
import { time } from "console";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [startTime, setStartTime] = useState(25);
  const [minutes, setMinutes] = useState(startTime);
  const [seconds, setSeconds] = useState(0);
  const [isBreak, setIsBreak] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [animationActive, setAnimationActive] = useState(false);
  const [onHold, setOnHold] = useState(false);

  useEffect(() => {
    if (!seconds && !minutes) {
      setIsBreak((prevState) => !prevState);
    }
  }, [seconds, minutes]);

  useEffect(() => {
    if (!seconds && !minutes) {
      window.alert(
        `Hey, ${
          !isBreak
            ? "your break is up, back to work!"
            : "it's time for a break!"
        }`
      );
    }
    if (isBreak) {
      setStartTime(5);
    } else {
      setStartTime(25);
    }
  }, [isBreak]);

  //   if (isBreak) {
  //     console.log("expanded:", expanded);

  // let intervalId: NodeJS.Timeout | undefined;
  // let intervalId2: NodeJS.Timeout | undefined;

  //     if (isBreak && timerActive && !animationActive) {
  //       setAnimationActive(true);
  //       setOnHold(false);
  //       setExpanded((state) => {
  //         return !state;
  //       });
  //       if (!animationActive) {
  //         intervalId = setInterval(() => {
  //           setOnHold(true);
  //           intervalId2 = setInterval(() => {
  //             setExpanded((state) => {
  //               return !state;
  //             });
  //             setOnHold((s) => !s);
  //           }, 4000);
  //         }, 4000);
  //       }
  //     }

  //     return () => {
  //       if (!timerActive || !isBreak) {
  //         console.log("cleanup");
  //         setOnHold(false);
  //         setExpanded(false);
  //         setAnimationActive(false);
  //         clearInterval(intervalId);
  //         clearInterval(intervalId2);
  //       }
  //     };
  //   }
  // }, [isBreak, timerActive, animationActive, expanded]);

  useEffect(() => {
    let intervalId1: NodeJS.Timeout | null = null;
    let intervalId2: NodeJS.Timeout | null = null;

    if (animationActive) {
      console.log("start animation");
      setOnHold(true);

      intervalId1 = setInterval(() => {
        setOnHold(true);
        if (intervalId2) {
          clearInterval(intervalId2);
        }
        intervalId2 = setInterval(() => {
          setExpanded((state) => !state);
          setOnHold((s) => !s);
        }, 4000);
      }, 8000);

      intervalId2 = setInterval(() => {
        setExpanded((state) => !state);
        setOnHold((s) => !s);
      }, 4000);
    } else {
      console.log("pause animation");
      if (intervalId2) {
        clearInterval(intervalId2);
      }
      if (intervalId1) {
        clearInterval(intervalId1);
      }
    }

    return () => {
      console.log("cleanup");
      if (intervalId2) {
        clearInterval(intervalId2);
      }
      if (intervalId1) {
        clearInterval(intervalId1);
      }
    };
  }, [animationActive]);

  return (
    <main
      className={`${
        darkMode && "dark"
      } flex flex-col items-start min-h-screen bg:slate-500  ${
        inter.className
      }`}
    >
      <div
        id="header"
        className={`w-screen dark:text-white text-slate-800 px-12 lg:px-20 py-12 flex dark:bg-slate-900 bg-slate-50 justify-between items-center h-full ${inter.className}`}
      >
        <h1 className="text-4xl lg:text-5xl">PomoDojo</h1>
        <div className="flex flex-col items-center">
          <Switch
            className="border-2 py-3 mb-2 border-white"
            onCheckedChange={() => setDarkMode((state) => !state)}
          />
          <p className="">{darkMode ? "Dark" : "Light"}</p>
        </div>
      </div>
      <div className="w-screen h-screen flex flex-col bg-slate-100 dark:bg-slate-800">
        <div className="flex flex-col">
          <div>
            <Timer
              minutes={minutes}
              setMinutes={setMinutes}
              active={timerActive}
              setActive={setTimerActive}
              seconds={seconds}
              setSeconds={setSeconds}
            />
          </div>
          {isBreak && (
            <div className="flex flex-col relative items-center justify-center">
              <Image
                className="absolute z-0 dark:opacity-35"
                src="/lotus2.png"
                width={400}
                height={400}
                alt="lotus"
              />
              <div
                className={`rounded-full w-72 h-72 z-10 transition-all flex items-center justify-center border-8 ${
                  expanded ? "border-sky-200" : "border-indigo-200"
                }`}
              >
                <div
                  onClick={() => {
                    timerActive && !animationActive && setAnimationActive(true);
                  }}
                  className={`flex justify-center text-white dark:text-slate-800 font-bold items-center opacity-80 cursor-pointer transform w-20 h-20 rounded-full transition-all duration-4000 ${
                    expanded && "w-64 h-64"
                  } ${expanded ? "bg-sky-200" : "bg-indigo-200"}
                  `} //clean
                >
                  {timerActive && !animationActive && "CLICK"}
                </div>
              </div>
              {animationActive && (
                <div className="flex justify-center items-center p-6 text-2xl dark:text-white">
                  {onHold ? "Hold" : expanded ? "Breathe In" : "Breathe Out"}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row py-10 justify-center items-center dark:bg-slate-800 bg-slate-100 ">
          <button
            onClick={() => {
              setAnimationActive(false);
              if (minutes || seconds) {
                setTimerActive((active) => !active);
              } else {
                setMinutes(startTime);
                setTimerActive(true);
              }
            }}
            className="border-2 border-black dark:border-white px-4 py-1 text-white sm:mb-0 mb-3 sm:mr-2 bg-black hover:opacity-70  rounded-md dark:bg-white dark:hover:opacity-80  dark:text-slate-800"
          >
            {timerActive ? "Pause " : "Start "}
            {isBreak ? "Break" : "Focus"}
          </button>

          {/* {seconds || minutes ? (
            <button
              onClick={() => {
                setMinutes(startTime);
                setTimerActive(false);
                setSeconds(0);
              }}
              className="px-4 py-1 text-black border-2 border-black hover:bg-slate-200 text-sm rounded-md dark:text-white dark:border-white dark:hover:bg-slate-800"
            >
              Reset
            </button>
          ) : ( */}
          <button
            onClick={() => {
              setIsBreak((state) => !state);
              setTimerActive(false);
              setAnimationActive(false);
              setSeconds(0);
              if (isBreak) {
                setMinutes(25);
              } else {
                setMinutes(5);
                setExpanded(false);
              }
            }}
            className="px-4 py-1 text-black border-2 border-black hover:bg-slate-200 rounded-md dark:text-white dark:border-white dark:hover:bg-slate-600"
          >
            {isBreak ? "Skip this Break?" : "Skip to a break?"}
          </button>
          {/* )} */}
        </div>
      </div>
    </main>
  );
}
