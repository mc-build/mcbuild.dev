import styles from "./McBuildTitle.module.less";
import Image from "next/image";
import MCBLogo from "../../assets/images/branding/computer50.png";
import classnames from "classnames";
export interface IMcBuildTitleProps {
  logo: boolean;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  outline?: boolean;
}
export function McBuildTitle({
  level = "h1",
  logo = true,
  outline = true,
}: IMcBuildTitleProps) {
  const Level = level;
  return (
    <div className={classnames(styles.title, outline && styles.outline)}>
      {logo && (
        <div className={styles.logo}>
          <Image
            src={MCBLogo}
            width={20}
            height={20}
            role="none"
            draggable="false"
          />
        </div>
      )}
      <Level className={styles.text}>MC-BUILD</Level>
    </div>
  );
}
