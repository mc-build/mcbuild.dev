import styles from "./Logo.module.less";
import Image from "next/image";
import LogoImg from "../../assets/images/branding/computer50.png";
import React from "react";
import classnames from "classnames";
export interface ILogoProps {
  size: number;
  className?: string;
  style?: React.CSSProperties;
  centered?: boolean;
}

export function Logo({ size, style, className, centered }: ILogoProps) {
  const res = (
    <div className={classnames(styles.logo, className)} style={style}>
      <img src={LogoImg} width={size} height={size} />
    </div>
  );
  if (centered) {
    return <div className={styles.centered}>{res}</div>;
  }
  return res;
}
