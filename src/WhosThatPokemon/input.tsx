import { SpaceBarIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import React, { memo, useCallback, useEffect, useState } from "react";

interface InputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  word: string;
}

function WhosThatPokemonInput({ inputRef, word }: InputProps) {
  const [input, setInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  function compareInput(inputChar: string, wordChar: string) {
    if (!inputChar) return false;

    return inputChar.toLowerCase() === wordChar.toLowerCase();
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === " ") {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    },
    [inputRef]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative flex flex-col items-center">
      <input
        className={cn(
          "absolute focus:outline-none text-transparent bg-transparent",
          input.length === word.length
            ? input.toLowerCase() === word.toLowerCase()
              ? "ring-green-500"
              : "ring-red-700"
            : "ring-gray-500"
        )}
        type="text"
        ref={inputRef}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        maxLength={word.length}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
      />

      <div
        className={cn(
          "flex justify-center h-full gap-2 text-2xl font-bold tracking-widest uppercase bg-black/10 p-4 ring-4 rounded-xl transition-all duration-300",
          isFocused
            ? input.length === word.length
              ? input.toLowerCase() === word.toLowerCase()
                ? "ring-green-500"
                : "ring-red-700"
              : "ring-foreground"
            : "ring-transparent dark:ring-neutral-700"
        )}
        onClick={() => inputRef.current?.focus()}>
        {word.split("").map((char, index) => {
          const inputChar = input.split("")[index];
          const isTyped = index < input.length;

          return (
            <span
              key={index}
              className={cn(
                "font-base",
                isTyped
                  ? compareInput(inputChar, char)
                    ? "text-green-600"
                    : "text-red-600"
                  : "text-foreground"
              )}>
              {isTyped ? (
                inputChar
              ) : (
                <div className={cn("font-mono animate-bounce", `${isFocused && "animate-pulse"}`)}>
                  {"_"}
                </div>
              )}
            </span>
          );
        })}
      </div>
      {!isFocused && (
        <div className="flex items-center gap-2 animate-pulse">
          <span>Press</span>
          <SpaceBarIcon color="fill-foreground" />
          <span>to focus</span>
        </div>
      )}
    </div>
  );
}

export default memo(WhosThatPokemonInput);
