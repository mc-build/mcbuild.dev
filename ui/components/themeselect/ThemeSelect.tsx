import classnames from "classnames";
import { useEffect, useState } from "react";
import { useUniqueValue } from "../../hooks/useUniqueValue";
import styles from "./ThemeSelect.module.less";
export enum ThemeTypes {
  LIGHT,
  MIX,
  DARK,
}
const classLookup = {
  [ThemeTypes.LIGHT]: styles.light,
  [ThemeTypes.MIX]: styles.mix,
  [ThemeTypes.DARK]: styles.dark,
};
export interface IThemeSelectProps {
  mode: ThemeTypes;
  onModeChange(theme: ThemeTypes): void;
}

export function ThemeSelect({ mode, onModeChange }: IThemeSelectProps) {
  const [selectedMode, setSelectedMode] = useState<ThemeTypes>(
    mode || ThemeTypes.MIX
  );
  const ids = Array.from({ length: 3 }, (_, index) =>
    useUniqueValue(`theme-select-${ThemeTypes[index]}`)
  );
  useEffect(() => {
    if (mode != selectedMode) {
      onModeChange(selectedMode);
    }
  }, [selectedMode, mode]);
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
          setSelectedMode(((selectedMode + 1) % 3) as ThemeTypes);
        }}
        htmlFor={ids[(selectedMode + 1) % 3]}
      >
        <div className={styles.content}>
          <div>🌛</div>
          <div>🌞</div>
        </div>
        <div className={styles.knob}></div>
      </label>
    </div>
  );
}
