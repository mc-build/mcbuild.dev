import { useRef } from "react";

let names = new Map();
export function useUniqueValue(name: string = "unknown"): string {
  const value = useRef<string>("");
  if (value.current === "") {
    if (names.has(name)) {
      names.set(name, names.get(name) + 1);
    } else {
      names.set(name, 0);
    }
    value.current = `${name}-${names.get(name)}`;
  }
  return value.current;
}
useUniqueValue.reset = () => (names = new Map());
