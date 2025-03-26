import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  ForwardedRef,
  forwardRef,
} from "react";

interface TimerProps {
  setTime: (value: number) => void;
}

export interface TimerFunctions {
  startTimer: () => void;
  stopTimer: () => void;
}

function WhosThatPokemonTimer(props: TimerProps, ref: ForwardedRef<TimerFunctions>) {
  const [myTimer, setMyTimer] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startTimer = () => {
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
    props.setTime(myTimer);
  };

  useImperativeHandle(ref, () => ({
    startTimer,
    stopTimer,
  }));

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

export default forwardRef(WhosThatPokemonTimer);
