import styles from "./McBuildTitle.module.less";
import Image from "next/image";
import MCBLogo from "../../assets/images/branding/computer50.png";
import { McBuildVersion } from "../mcbuildversion/McBuildVersion";
export interface IMcBuildTitleProps {
  version: boolean;
  logo: boolean;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
let mcb_version = null;
export function McBuildTitle({
  version = false,
  level = "h1",
  logo = true,
}: IMcBuildTitleProps) {
  //TODO: fetch version from api, check cors rules for localhost
  const Level = level;
  return (
    <div className={styles.title}>
      {logo && (
        <div className={styles.logo}>
          <Image src={MCBLogo} width={20} height={20} />
        </div>
      )}
      <Level className={styles.text}>
        MC-BUILD {version && <McBuildVersion prefix="v"></McBuildVersion>}
      </Level>
    </div>
  );
}
