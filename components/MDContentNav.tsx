import { createContext, useRef, useState } from "react";
interface Header {
  name: string;
  level: number;
  id: string;
}
interface IMDContentNavContext {
  headers: Header[];
  addHeader(h: Header, id: null | number): number;
  reset():void;
}
export const MDContentContext = createContext<IMDContentNavContext>({
  headers: [],
  addHeader() {
    return 0;
  },
  reset(){}
});
MDContentContext.displayName = "MDContent";
export function MDContent({ children }) {
  const _id = useRef(0);
  const [headers, setHeaders] = useState<Header[]>([]);
  const addHeader = (n: Header, id: null | number) => {
    const next = (h) => {
      if (id === null) return [...h, n];
      const copy = [...h];
      copy[id] = n;
      return copy;
    };
    setHeaders(next);
    if (id === null) {
      const v = _id.current;
      _id.current++;
      return v;
    }
    return id;
  };
  return (
    <MDContentContext.Provider
      value={{
        headers,
        addHeader,
        reset(){
          setHeaders([]);
          _id.current=0;
        }
      }}
    >
      {children}
    </MDContentContext.Provider>
  );
}
