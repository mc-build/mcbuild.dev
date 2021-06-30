import styles from "./Header.module.less";
import Image from "next/image";
import Link from "next/link";

import Computer from "../../assets/images/branding/computer50.png";
import Gear from "../../assets/images/branding/gear50.png";

import classnames from "classnames";
import { useEffect, useState } from "react";
import { McBuildTitle } from "../mcbuildtitle/McBuildTitle";
import { ThemeSelect } from "../themeselect/ThemeSelect";
import { useMedia } from "react-use";

export interface IHeaderProps {
  page: string;
}

const navItems = [
  { name: "Home", test: /^\/$/, img: Computer,path:"/" },
  { name: "Docs", test: /^\/docs/, img: Gear,path:"/docs/home" },
];
export function Header({ page }: IHeaderProps) {
  const isMobile = useMedia("(max-width:320px)");
  const selected = navItems.findIndex((item) => item.test.test(page));
  const [selectedIndex, setSelectedIndex] = useState(selected);
  useEffect(() => {
    setSelectedIndex(selected);
  }, [selected]);
  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        {navItems.map((item, index) => (
          <Link href={item.path} key={item.path}>
            <a className={classnames(
                  styles.link,
                  selectedIndex === index && styles.selected
                )}>
              <div
                className={classnames(
                  styles.navItem,
                  selectedIndex !== index && styles.selected
                )}
              >
                <div className={styles.img}>
                  <Image src={item.img} width={30} height={30}></Image>
                </div>
                <p>{item.name}</p>
              </div>
            </a>
          </Link>
        ))}
      </nav>
      <div className={styles.logo}>
        <McBuildTitle logo={!isMobile}></McBuildTitle>
      </div>
      <div className={styles.darkMode}>
        <div className={styles.wrapper}>
          <ThemeSelect></ThemeSelect>
        </div>
      </div>
    </div>
  );
}
