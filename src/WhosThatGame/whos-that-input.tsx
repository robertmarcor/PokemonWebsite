import React from "react";
import { useState } from "react";

function WhosThatGameInput({
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
          <svg
            className="dark fill-foreground size-16"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 122.88 54.99"
            xmlSpace="preserve">
            <path d="M11.61,0h99.65c3.19,0,6.09,1.31,8.2,3.41c2.11,2.11,3.42,5.02,3.42,8.2v31.77c0,3.18-1.31,6.09-3.42,8.19 c-2.11,2.11-5.01,3.42-8.19,3.42H11.61c-3.18,0-6.09-1.31-8.2-3.42c-2.1-2.1-3.41-5-3.41-8.2V11.61c0-3.2,1.31-6.1,3.41-8.2 C5.51,1.31,8.42,0,11.61,0L11.61,0z M29.34,26.85l4.06-0.27c0.09,0.69,0.27,1.23,0.54,1.59c0.44,0.59,1.07,0.89,1.89,0.89 c0.61,0,1.08-0.15,1.41-0.45c0.33-0.3,0.5-0.65,0.5-1.05c0-0.38-0.15-0.72-0.47-1.02c-0.31-0.3-1.04-0.58-2.18-0.85 c-1.87-0.44-3.21-1.03-4-1.77c-0.8-0.74-1.21-1.67-1.21-2.82c0-0.75,0.21-1.46,0.62-2.12c0.41-0.67,1.03-1.19,1.86-1.58 c0.83-0.38,1.96-0.57,3.4-0.57c1.77,0,3.11,0.35,4.04,1.05c0.93,0.69,1.48,1.8,1.65,3.32l-4.02,0.25 c-0.11-0.66-0.33-1.15-0.67-1.45c-0.34-0.3-0.82-0.45-1.42-0.45c-0.5,0-0.87,0.11-1.12,0.33c-0.25,0.22-0.38,0.49-0.38,0.81 c0,0.23,0.1,0.44,0.31,0.63c0.2,0.19,0.67,0.37,1.43,0.54c1.87,0.43,3.2,0.86,4.01,1.29c0.81,0.44,1.4,0.97,1.76,1.62 c0.37,0.64,0.55,1.36,0.55,2.16c0,0.94-0.24,1.8-0.73,2.59c-0.49,0.79-1.17,1.39-2.06,1.8c-0.88,0.41-1.99,0.61-3.32,0.61 c-2.35,0-3.98-0.48-4.88-1.44C29.98,29.54,29.46,28.32,29.34,26.85L29.34,26.85z M43.79,35.71V21.08h3.6v1.56 c0.5-0.66,0.95-1.11,1.37-1.34c0.56-0.31,1.18-0.47,1.86-0.47c1.34,0,2.37,0.54,3.11,1.63c0.73,1.09,1.1,2.43,1.1,4.03 c0,1.77-0.4,3.11-1.2,4.04c-0.8,0.93-1.81,1.39-3.03,1.39c-0.59,0-1.13-0.11-1.62-0.32c-0.49-0.21-0.92-0.53-1.31-0.95v5.04H43.79 L43.79,35.71z M47.64,26.42c0,0.84,0.17,1.47,0.5,1.88c0.33,0.41,0.75,0.61,1.26,0.61c0.44,0,0.82-0.19,1.12-0.59 c0.3-0.39,0.45-1.06,0.45-1.99c0-0.86-0.16-1.5-0.47-1.9c-0.32-0.41-0.7-0.61-1.15-0.61c-0.49,0-0.89,0.2-1.22,0.61 C47.81,24.84,47.64,25.5,47.64,26.42L47.64,26.42z M60.17,24.52l-3.67-0.41c0.14-0.68,0.34-1.22,0.6-1.6 c0.26-0.39,0.63-0.73,1.13-1.01c0.35-0.21,0.83-0.37,1.45-0.48c0.61-0.11,1.28-0.17,2-0.17c1.15,0,2.07,0.07,2.77,0.2 c0.7,0.14,1.28,0.42,1.74,0.85c0.33,0.3,0.59,0.73,0.77,1.27c0.19,0.55,0.28,1.07,0.28,1.57v4.68c0,0.5,0.03,0.89,0.09,1.17 c0.06,0.28,0.19,0.64,0.39,1.08h-3.59c-0.14-0.27-0.24-0.48-0.28-0.62c-0.04-0.14-0.09-0.36-0.13-0.67c-0.5,0.51-1,0.87-1.5,1.09 c-0.68,0.29-1.47,0.44-2.37,0.44c-1.19,0-2.1-0.29-2.72-0.88c-0.62-0.59-0.93-1.31-0.93-2.17c0-0.81,0.22-1.47,0.67-1.99 c0.45-0.52,1.27-0.91,2.47-1.16c1.44-0.31,2.37-0.52,2.8-0.65c0.43-0.12,0.88-0.28,1.36-0.48c0-0.5-0.1-0.85-0.29-1.05 c-0.19-0.2-0.53-0.3-1.02-0.3c-0.63,0-1.1,0.11-1.41,0.32C60.51,23.74,60.32,24.05,60.17,24.52L60.17,24.52z M63.49,26.64 c-0.53,0.2-1.08,0.38-1.65,0.53c-0.78,0.22-1.27,0.44-1.48,0.65c-0.22,0.22-0.32,0.47-0.32,0.76c0,0.32,0.11,0.59,0.32,0.79 c0.21,0.2,0.52,0.31,0.93,0.31c0.43,0,0.83-0.11,1.2-0.33c0.37-0.22,0.63-0.49,0.78-0.81c0.15-0.32,0.23-0.74,0.23-1.25V26.64 L63.49,26.64z M77.01,27.54l3.65,0.43c-0.2,0.81-0.53,1.5-0.99,2.1c-0.46,0.59-1.05,1.05-1.76,1.38c-0.71,0.33-1.62,0.49-2.72,0.49 c-1.06,0-1.95-0.11-2.66-0.31c-0.7-0.21-1.31-0.55-1.82-1.02c-0.51-0.47-0.91-1.02-1.2-1.65c-0.29-0.63-0.43-1.47-0.43-2.52 c0-1.09,0.18-2,0.53-2.72c0.26-0.53,0.61-1.01,1.06-1.43c0.45-0.42,0.9-0.74,1.38-0.94c0.75-0.33,1.71-0.49,2.88-0.49 c1.64,0,2.88,0.31,3.74,0.93c0.86,0.62,1.46,1.52,1.81,2.71l-3.61,0.51c-0.11-0.45-0.32-0.79-0.62-1.02 c-0.3-0.23-0.7-0.34-1.21-0.34c-0.63,0-1.15,0.24-1.54,0.72c-0.39,0.48-0.59,1.21-0.59,2.19c0,0.87,0.2,1.53,0.59,1.98 c0.39,0.45,0.88,0.68,1.49,0.68c0.5,0,0.93-0.14,1.27-0.41C76.58,28.52,76.84,28.1,77.01,27.54L77.01,27.54z M93.54,27.4h-7.7 c0.07,0.65,0.24,1.14,0.5,1.46c0.37,0.46,0.86,0.69,1.45,0.69c0.38,0,0.74-0.1,1.08-0.3c0.21-0.13,0.43-0.35,0.67-0.66l3.78,0.37 c-0.58,1.06-1.28,1.83-2.1,2.29c-0.82,0.46-1.99,0.69-3.52,0.69c-1.33,0-2.37-0.2-3.13-0.6c-0.76-0.39-1.39-1.02-1.89-1.89 c-0.5-0.86-0.75-1.88-0.75-3.04c0-1.66,0.5-3,1.51-4.03c1-1.02,2.39-1.54,4.16-1.54c1.44,0,2.56,0.23,3.4,0.69 c0.83,0.46,1.46,1.12,1.9,2c0.43,0.87,0.65,2.01,0.65,3.41V27.4L93.54,27.4z M89.63,25.46c-0.07-0.79-0.28-1.35-0.6-1.7 c-0.33-0.34-0.75-0.51-1.28-0.51c-0.61,0-1.1,0.26-1.47,0.77c-0.23,0.32-0.38,0.8-0.44,1.43H89.63L89.63,25.46z M2.5,39.07 c0.43,1.63,1.29,3.09,2.45,4.25c1.71,1.71,4.07,2.77,6.66,2.77h99.66c0.1,0,0.21,0,0.31-0.01l0.64-0.04 c2.21-0.22,4.21-1.22,5.71-2.72c1.16-1.16,2.02-2.62,2.45-4.24V11.61c0-2.49-1.03-4.78-2.68-6.43c-1.65-1.65-3.93-2.68-6.43-2.68 H11.61c-2.5,0-4.78,1.03-6.43,2.68C3.53,6.83,2.5,9.11,2.5,11.61V39.07L2.5,39.07z" />
          </svg>
          <span>to focus</span>
        </div>
      )}
    </>
  );
}

export default React.memo(WhosThatGameInput);
