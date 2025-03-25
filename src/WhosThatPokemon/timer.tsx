import React, { useState, useEffect, useRef, memo } from "react";
import { useTimerContext } from "../contexts/WhosThatPokemonContext";

const WhosThatPokemonTimer = memo(function WhosThatPokemonTimer() {
  // Use the specific context for timer
  const { setTimer } = useTimerContext();
  const [myTimer, setMyTimer] = useState<number>(0);

  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  console.log("Timer component rendered");

  function startTimer() {
    startTimeRef.current = Date.now();

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      if (startTimeRef.current !== null) {
        const elapsed = Date.now() - startTimeRef.current;
        setMyTimer(elapsed);
        // Convert to string for the context
        setTimer(elapsed.toString());
      }
    }, 100);
  }

  function stopTimer() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="timer-container">
      <p>Time: {(myTimer / 1000).toFixed(1)} seconds</p>
      <div className="timer-buttons">
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
      </div>
    </div>
  );
});

export default WhosThatPokemonTimer;
