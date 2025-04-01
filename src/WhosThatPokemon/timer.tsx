import React, { useState, useEffect, useRef, useImperativeHandle } from "react";

interface TimerProps {
  setTime: (value: number) => void;
  ref: React.RefObject<TimerFunctions | null>;
}

export interface TimerFunctions {
  startTimer: () => void;
  stopTimer: () => void;
  getElapsedTime: () => number;
}

function WhosThatPokemonTimer({ setTime, ref }: TimerProps) {
  const [myTimer, setMyTimer] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startTimer = () => {
    console.log("started");
    startTimeRef.current = Date.now();

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      if (startTimeRef.current !== null) {
        const elapsed = Date.now() - startTimeRef.current;
        setMyTimer(elapsed);
      }
    }, 100);
  };

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTime(myTimer);
  };

  if (ref.current) {
    ref.current.startTimer = startTimer;
    ref.current.stopTimer = stopTimer;
    ref.current.getElapsedTime = () => myTimer;
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex justify-end mr-7 font-semibold">
      <p>{(myTimer / 1000).toFixed(1)} s</p>
      <p className="absolute right-4 animate-[spin_3s_linear_infinite]">⏳</p>
    </div>
  );
}

export default WhosThatPokemonTimer;
