import { useState, useRef, useEffect, useCallback } from "react";

export type TimerRef = {
  startTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;
} | null;

const GuessTimer = ({
  className,
  timerRef,
  onTimeUpdate,
}: {
  className: string;
  timerRef: React.RefObject<TimerRef>;
  onTimeUpdate?: (timeElapsed: number) => void;
}) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const localTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef(0);

  const startTimer = useCallback(() => {
    if (localTimerRef.current) return;
    startTimeRef.current = Date.now();
    localTimerRef.current = window.setInterval(() => {
      setTimeElapsed(Date.now() - startTimeRef.current);
    }, 100);
  }, []);

  const stopTimer = useCallback(() => {
    if (localTimerRef.current) {
      clearInterval(localTimerRef.current);
      localTimerRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    stopTimer();
    setTimeElapsed(0);
  }, [stopTimer]);

  useEffect(() => {
    if (timerRef) {
      timerRef.current = { startTimer, stopTimer, resetTimer };
    }
    if (onTimeUpdate) {
      onTimeUpdate(timeElapsed);
    }
  }, [onTimeUpdate, resetTimer, startTimer, stopTimer, timeElapsed, timerRef]);

  return (
    <div className={`${className} flex`}>
      <p> Time: {(timeElapsed / 1000).toFixed(1)}</p>
      <p className="animate-bounce">⏳</p>
    </div>
  );
};

export default GuessTimer;
