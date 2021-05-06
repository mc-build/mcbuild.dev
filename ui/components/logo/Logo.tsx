import styles from "./Logo.module.less";
import Image from "next/image";
import LogoImg from "../../assets/images/branding/computer50.png";
import React from "react";
import classnames from "classnames";
export interface ILogoProps {
  size: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Logo({ size, style, className }: ILogoProps) {
  return (
    <div className={classnames(styles.logo, className)} style={style}>
      <img src={LogoImg} width={size} height={size} />
    </div>
  );
}
