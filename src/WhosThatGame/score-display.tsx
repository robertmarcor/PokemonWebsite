import { memo } from "react";

type Props = {
  className?: string;
  score: number;
  hp?: number;
  streak?: number;
};
export default memo(function ScoreDisplay({ className, score, hp, streak }: Props) {
  return (
    <div className={`${className} grid place-items-end w-60`}>
      <p className="font-bold">{score} Points</p>
      <p className="flex">{hp && Array.from({ length: hp }, (_, i) => <span key={i}>❤️</span>)}</p>
      {streak && <p>{streak} 🔥</p>}
    </div>
  );
});
