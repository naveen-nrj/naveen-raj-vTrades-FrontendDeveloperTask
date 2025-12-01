"use client";

import React, { useEffect, useRef } from "react";

type OTPInputProps = {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  inputClassName?: string;
};


export default function OTPInput({
  length = 6,
  value = "",
  onChange,
  className = "",
  inputClassName = "",
}: OTPInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Build an array of characters where empty slots are ""
  const normalizedArr = (() => {
    const chars = value ? value.replace(/\D/g, "").slice(0, length).split("") : [];
    const arr = new Array<string>(length).fill("");
    for (let i = 0; i < chars.length && i < length; i++) arr[i] = chars[i];
    return arr;
  })();

  // Focus first empty (or last if fully filled)
  useEffect(() => {
    const firstEmpty = normalizedArr.findIndex((ch) => ch === "");
    const idx = firstEmpty === -1 ? Math.min(length - 1, normalizedArr.length - 1) : firstEmpty;
    // small timeout to ensure inputs refs are attached in some render setups
    setTimeout(() => inputsRef.current[idx]?.focus(), 0);
  }, []); // run only on mount

  const composeValue = (arr: string[]) => {
    // remove trailing empty slots when reporting value
    return arr.join("").replace(/\u0000/g, "").trim();
  };

  const setAt = (index: number, char: string) => {
    const arr = normalizedArr.slice(); // base on initial arr
    // but we want current values from DOM if available
    for (let i = 0; i < length; i++) {
      const el = inputsRef.current[i];
      arr[i] = el?.value ?? arr[i] ?? "";
    }
    arr[index] = char;
    const newVal = arr.join("").replace(/\u0000/g, "").trim();
    onChange?.(newVal);
  };

  const handleKeyDown =
    (i: number) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const key = e.key;

      if (key === "ArrowLeft") {
        e.preventDefault();
        inputsRef.current[Math.max(0, i - 1)]?.focus();
        return;
      }
      if (key === "ArrowRight") {
        e.preventDefault();
        inputsRef.current[Math.min(length - 1, i + 1)]?.focus();
        return;
      }

      if (key === "Backspace") {
        e.preventDefault();
        const cur = (e.target as HTMLInputElement).value;
        if (cur) {
          // clear current
          (e.target as HTMLInputElement).value = "";
          setAt(i, "");
        } else {
          // move to previous and clear it
          const prevIndex = Math.max(0, i - 1);
          const prev = inputsRef.current[prevIndex];
          if (prev) {
            prev.value = "";
            prev.focus();
            setAt(prevIndex, "");
          }
        }
        return;
      }

      // Allow only digits
      if (key.length === 1 && !/^[0-9]$/.test(key)) {
        e.preventDefault();
      }
    };

  const handleInput =
    (i: number) =>
    (e: React.FormEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      const val = target.value;

      if (!val) {
        setAt(i, "");
        return;
      }

      // If multiple chars pasted/typed quickly
      if (val.length > 1) {
        const chars = val.replace(/\D/g, "").slice(0, length - i).split("");
        for (let j = 0; j < chars.length; j++) {
          const idx = i + j;
          const inputEl = inputsRef.current[idx];
          if (inputEl) inputEl.value = chars[j];
        }
        // build new array from DOM
        const arr = new Array<string>(length).fill("");
        for (let k = 0; k < length; k++) arr[k] = inputsRef.current[k]?.value ?? "";
        onChange?.(composeValue(arr));
        const nextEmpty = arr.findIndex((ch, idx) => ch === "" && idx >= i);
        const nextIdx = nextEmpty === -1 ? Math.min(length - 1, i + chars.length) : nextEmpty;
        inputsRef.current[nextIdx]?.focus();
        return;
      }

      // Single character
      const ch = val.replace(/\D/g, "").slice(-1);
      if (!ch) {
        target.value = "";
        setAt(i, "");
        return;
      }
      target.value = ch;
      setAt(i, ch);
      const next = Math.min(length - 1, i + 1);
      inputsRef.current[next]?.focus();
    };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!paste) return;
    const chars = paste.slice(0, length).split("");
    for (let j = 0; j < chars.length; j++) {
      const el = inputsRef.current[j];
      if (el) el.value = chars[j];
    }
    const arr = new Array<string>(length).fill("");
    for (let k = 0; k < length; k++) arr[k] = inputsRef.current[k]?.value ?? "";
    onChange?.(composeValue(arr));
    const focusIndex = Math.min(length - 1, chars.length);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          defaultValue={normalizedArr[i] ?? ""}
          onKeyDown={handleKeyDown(i)}
          onInput={handleInput(i)}
          onPaste={handlePaste}
          aria-label={`OTP digit ${i + 1}`}
          className={
            `w-12 h-12 rounded-md bg-[#141417] border border-[#2a2b30] text-center text-size12 text-white outline-none focus:ring-2 focus:ring-[#6f42c1] ` +
            inputClassName
          }
        />
      ))}
    </div>
  );
}
