import * as nextImage from "next/image";
import { addDecorator } from "@storybook/react";
import { withThemes } from "storybook-addon-themes/react";
import React, { useEffect, useState } from "react";
import { ThemeContext } from "../ui/components/themeprovider/ThemeContext";
const THEME_LS_KEY = "storybook.mcbuild.dev-theme";
addDecorator(withThemes);
const ThemeTypes = {
  0: "LIGHT",
  1: "MIX",
  2: "DARK",
  LIGHT: 0,
  MIX: 1,
  DARK: 2,
};
function ThemeProvider({ children, _theme }) {
  const [theme, setTheme] = useState(ThemeTypes.LIGHT);
  useEffect(() => {
    const item = localStorage.getItem(THEME_LS_KEY);
    if (item) {
      setTheme(ThemeTypes[item] || ThemeTypes.LIGHT);
    } else {
      localStorage.setItem(THEME_LS_KEY, ThemeTypes[theme]);
    }
  }, []);
  useEffect(() => {
    if (_theme !== undefined) setTheme(_theme);
  }, [_theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme(new_theme) {
          console.log(new_theme);
          if (new_theme != theme) setTheme(new_theme);
          localStorage.setItem(THEME_LS_KEY, ThemeTypes[new_theme]);
          document.body.setAttribute(
            "theme",
            ThemeTypes[new_theme].toLowerCase()
          );
        },
      }}
    >
      <div className={"root theme-" + ThemeTypes[theme].toLowerCase()}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themes: {
    default: "light",
    target: "body",
    Decorator({ children, themeName }) {
      document.body.setAttribute("theme", themeName);
      return (
        <ThemeProvider _theme={ThemeTypes[themeName.toUpperCase()] || 0}>
          {children}
        </ThemeProvider>
      );
    },
    list: [
      { name: "light", class: "theme-light", color: "#00aced" },
      { name: "mix", class: "theme-mix", color: "#3b5998" },
      { name: "dark", class: "theme-dark", color: "#131416" },
    ],
  },
};

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => {
    const { width, height } = props;
    const ratio = (height / width) * 100;
    return (
      <div
        style={{
          position: "relative",
          width: width + "px",
          height: height + "px",
        }}
      >
        <img
          style={{
            width: `${width}px`,
            height: `${height}px`,
          }}
          {...props}
        />
      </div>
    );
  },
});
