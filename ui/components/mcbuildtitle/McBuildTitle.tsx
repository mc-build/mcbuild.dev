import styles from "./McBuildTitle.module.less";
import Image from "next/image";
import MCBLogo from "../../assets/images/branding/computer50.png";
export interface IMcBuildTitleProps {
  logo: boolean;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
export function McBuildTitle({
  level = "h1",
  logo = true,
}: IMcBuildTitleProps) {
  const Level = level;
  return (
    <div className={styles.title}>
      {logo && (
        <div className={styles.logo}>
          <Image src={MCBLogo} width={20} height={20} role="none" />
        </div>
      )}
      <Level className={styles.text}>MC-BUILD</Level>
    </div>
  );
}
