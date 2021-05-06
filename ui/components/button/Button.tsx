import classnames from "classnames";
import React, { MouseEventHandler } from "react";
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
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({
  children,
  type = ButtonType.FULL,
  className,
  onClick,
}: React.PropsWithChildren<IButtonProps>) {
  return (
    <button
      className={classnames(className, styles.button, ButtonTypeClasses[type])}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
