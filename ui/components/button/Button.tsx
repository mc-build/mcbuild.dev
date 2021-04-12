import classnames from "classnames";
import React from "react";
import styles from "./Button.module.less";
export enum ButtonType {
  EMPTY,
  FULL,
}
const ButtonTypeClasses = {
  [ButtonType.EMPTY]: styles.empty,
  [ButtonType.FULL]: styles.full,
};
export interface IButtonProps {
  type?: ButtonType;
  className?: string;
}

export function Button({
  children,
  type = ButtonType.FULL,
  className,
}: React.PropsWithChildren<IButtonProps>) {
  return (
    <button
      className={classnames(className, styles.button, ButtonTypeClasses[type])}
    >
      {children}
    </button>
  );
}
