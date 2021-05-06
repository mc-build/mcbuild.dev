import React from "react";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { McBuildUpdates } from "../mcbuildupdates/McBuildUpdates";
import styles from "./Layout.module.less";
import "../../global.less";
import classNames from "classnames";
export interface ILayoutProps {
  page: string;
  className: string;
}

export function Layout({
  children,
  page,
  className,
}: React.PropsWithChildren<ILayoutProps>) {
  return (
    <>
      <header>
        <Header page={page}></Header>
      </header>
      <main className={classNames(styles.content, className)}>{children}</main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}
