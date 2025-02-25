import { useEffect, useState } from "react";

export default function WhosThatGameInput({
  word,
  inputRef,
  inputValue,
  setInputValue,
  handleKeyDown,
}: {
  word: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {}, [inputRef]);

  return (
    <>
      <div className="relative flex justify-center items-center p-4 w-full">
        <input
          className={`bg-transparent text-transparent p-2 z-10 focus:outline-none border-4 rounded-md w-full ${
            isFocused
              ? inputValue.length === word.length
                ? inputValue === word
                  ? "border-emerald-400" // Correct input: blue border
                  : "border-red-500" // Incorrect input: red border
                : "border-white" // Incomplete input: white border
              : "border-white" // Not focused: white border
          }`}
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          maxLength={word.length}
        />

        {isFocused && (
          <div className="absolute flex justify-center gap-2 text-4xl font-bold uppercase tracking-widest px-4 h-12">
            {word.split("").map((char, index) => {
              const isCorrect = inputValue[index]?.toLowerCase() === char.toLowerCase();
              const isTyped = index < inputValue.length;

              return (
                <span
                  key={index}
                  className={`pb-1 ${inputValue.length < 1 && "animate-pulse"} ${
                    isCorrect
                      ? "underline underline-green-500 text-green-500"
                      : isTyped
                      ? "underline underline-red-500 text-red-500"
                      : ""
                  }`}>
                  {isFocused && isTyped ? inputValue[index] : "_"}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {!isFocused && <p className="animate-pulse opacity-0">Press Space to focus</p>}
    </>
  );
}
