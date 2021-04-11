import styles from "./Example.module.less";

export interface IExampleProps {
  color: string;
}

export function Example({ color = "red" }: IExampleProps) {
  return (
    <div style={{ color }} className={styles.example}>
      Example!!!!!!
    </div>
  );
}
