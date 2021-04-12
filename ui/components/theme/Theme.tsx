import styles from "./Theme.module.less";

export interface IThemeProps {
  color: string;
}

export function Theme({ color = "red" }: IThemeProps) {
  return (
    <div style={{ color }} className={styles.example}>
      Example!!!!!!
    </div>
  );
}