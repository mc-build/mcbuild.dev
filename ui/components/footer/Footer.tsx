import Link from "next/link";
import Image from "next/image";
import MCBLogo from "../../assets/images/branding/computer50.png";
import Github from "../../assets/images/icons/github.svg";
import { McBuildVersion } from "../mcbuildversion/McBuildVersion";
import styles from "./Footer.module.less";
import { useContext } from "react";
import { ThemeContext, ThemeTypes } from "../themeprovider/ThemeProvider";

export interface IFooterProps {}

export function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.mcbLogo}>
            <div className={styles.logo}>
              <Image src={MCBLogo} width={33} height={33} role="none" />
            </div>
            <h2 className={styles.text}>MC-BUILD</h2>
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.wrapper}>
            <div>
              <Link href="/">
                <a>Home</a>
              </Link>
            </div>
            <div>
              <Link href="/docs">
                <a>Docs</a>
              </Link>
            </div>
            <div>
              <Link href="/conduct">
                <a>Code of Conduct</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.version}>
            <McBuildVersion></McBuildVersion>
          </div>
          <div className={styles.link}>
            <a
              href="http://github.com/mc-build/"
              style={{
                filter: theme === ThemeTypes.LIGHT ? undefined : "invert()",
              }}
            >
              <Github height={24}></Github>
            </a>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.meta}>
        <div className={styles.copyright}>Copyright © 2020</div>
        <div className={styles.discord}>
          <a href="https://discord.gg/kpGqTDX">Join our Discord</a>
        </div>
      </div>
    </div>
  );
}
