import { createContext, useContext, useEffect, useState } from "react";
import styles from "./Aside.module.less";
export enum DisplayMode {
  SINGLE,
  DOUBLE,
}
interface IAsideContext {
  setDisplayMode(mode: DisplayMode): void;
  displayMode: DisplayMode;
}
export const AsideContext = createContext<IAsideContext>({
  displayMode: DisplayMode.SINGLE,
  setDisplayMode(mode: DisplayMode) {},
});
export function AsideProvider({ children }) {
  const [displayMode, setDisplayMode] = useState(DisplayMode.SINGLE);
  return (
    <AsideContext.Provider
      value={{
        displayMode,
        setDisplayMode,
      }}
    >
      {children}
    </AsideContext.Provider>
  );
}
export function Aside({ children }) {
  return <div className={styles.aside}>{children}</div>;
}
Aside.Side = function Side({ children }) {
  const ctx = useContext(AsideContext);
  useEffect(() => {
    ctx.setDisplayMode(DisplayMode.DOUBLE);
  }, []);
  return <div className={styles.side}>{children}</div>;
};
