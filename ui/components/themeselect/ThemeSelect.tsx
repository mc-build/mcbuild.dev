import classnames from "classnames";
import { useContext, useEffect, useState } from "react";
import { useUniqueValue } from "../../hooks/useUniqueValue";
import styles from "./ThemeSelect.module.less";
import { ThemeContext, ThemeTypes } from "../themeprovider/ThemeProvider";
const classLookup = {
  [ThemeTypes.LIGHT]: styles.light,
  [ThemeTypes.MIX]: styles.mix,
  [ThemeTypes.DARK]: styles.dark,
};
export interface IThemeSelectProps {}

export function ThemeSelect() {
  const theme = useContext(ThemeContext);
  const [selectedMode, setSelectedMode] = useState<ThemeTypes>(
    theme.theme || ThemeTypes.LIGHT
  );
  const ids = Array.from({ length: 3 }, (_, index) =>
    useUniqueValue(`theme-select-${ThemeTypes[index]}`)
  );
  useEffect(() => {
    if (selectedMode !== theme.theme) {
      setSelectedMode(theme.theme);
    }
  }, [selectedMode, theme.theme]);
  return (
    <div className={classnames(classLookup[selectedMode], styles.themeSelect)}>
      {ids.map((id, index) => (
        <input
          key={id}
          id={id}
          checked={selectedMode === index}
          type="radio"
          value={index}
          readOnly
        />
      ))}
      <label
        onClick={() => {
          theme.setTheme(((selectedMode + 1) % 3) as ThemeTypes);
        }}
        htmlFor={ids[(selectedMode + 1) % 3]}
      >
        <div>
          <div className={styles.content}>
            <div>🌛</div>
            <div>🌞</div>
          </div>
          <div className={styles.knob}></div>
        </div>
      </label>
    </div>
  );
}
