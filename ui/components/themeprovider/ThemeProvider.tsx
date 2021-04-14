import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ThemeProvider.module.less";
const THEME_LS_KEY = "mcbuild.dev-theme";
export enum ThemeTypes {
  LIGHT,
  MIX,
  DARK,
}
export interface IThemeContext {
  theme: ThemeTypes;
  setTheme(theme: ThemeTypes): void;
}
import { ThemeContext as _Themecontext } from "./ThemeContext";
export const ThemeContext = (_Themecontext as unknown) as React.Context<IThemeContext>;
export interface IThemeProviderProps {}
export function ThemeProvider({
  children,
}: React.PropsWithChildren<IThemeProviderProps>) {
  const [theme, setTheme] = useState(ThemeTypes.LIGHT);
  const [isInTransition, setIsInTransition] = useState(false);
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    const item = localStorage.getItem(THEME_LS_KEY);
    if (item) {
      setTheme((ThemeTypes[item] as ThemeTypes) || ThemeTypes.LIGHT);
    } else {
      localStorage.setItem(THEME_LS_KEY, ThemeTypes[theme]);
    }
  }, []);
  useEffect(() => {
    if (isInTransition) {
      const id = setTimeout(() => {
        setIsInTransition(false);
      }, 1000);
      return () => clearTimeout(id);
    }
    return () => {};
  }, [isInTransition]);
  return (
    <>
      <div id="_theme" className={styles.shadow}></div>
      <ThemeContext.Provider
        value={{
          theme,
          setTheme(new_theme: ThemeTypes) {
            const node = ref.current.cloneNode(true) as HTMLDivElement;
            const div = document.createElement("div");
            div.appendChild(node);
            document.querySelector("#_theme").appendChild(div);
            setTimeout(() => {
              div.remove();
            }, 1000);
            setIsInTransition(true);
            setTheme(new_theme);
            localStorage.setItem(THEME_LS_KEY, ThemeTypes[new_theme]);
          },
        }}
      >
        <div
          className={classNames({
            root: true,
            [`theme-${ThemeTypes[theme].toLowerCase()}`]: true,
            [styles.transition]: isInTransition,
          })}
          ref={ref}
        >
          {children}
        </div>
      </ThemeContext.Provider>
    </>
  );
}
