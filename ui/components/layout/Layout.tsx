import React from "react";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import styles from "./Layout.module.less";

export interface ILayoutProps {
  page: string;
}

export function Layout({
  children,
  page,
}: React.PropsWithChildren<ILayoutProps>) {
  return (
    <div>
      <header>
        <Header page={page}></Header>
      </header>
      <div className={styles.content}>{children}</div>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
}
