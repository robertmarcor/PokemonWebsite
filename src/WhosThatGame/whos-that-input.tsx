import React from "react";
import { useState } from "react";
import { SpaceBarIcon } from "../assets/icons";

function WhosThatGameInput({
  word,
  inputRef,
  inputValue,
  setInputValue,
  handleKeyDown,
}: {
  word: string;
  inputRef: React.RefObject<HTMLInputElement>;
  inputValue: string;
  setInputValue: (value: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className="relative flex items-center justify-center p-4">
        <input
          className={`bg-transparent text-transparent p-2 px-8 z-10 focus:outline-none border-4 rounded-md w-full ${
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
          <div className="absolute flex justify-center h-12 gap-2 px-4 text-4xl font-bold tracking-widest uppercase">
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

      {!isFocused && (
        <div className="flex items-center gap-2 animate-pulse">
          <span>Press</span>
          <SpaceBarIcon color="fill-foreground" />
          <span>to focus</span>
        </div>
      )}
    </>
  );
}

export default React.memo(WhosThatGameInput);
