// import * as pages from "../../generated/docsPages";
// const { manifest, meta } = pages;
// console.log({ manifest, meta });
import Head from "next/head";
import { Layout } from "../../ui";
import styles from "./[...slug].module.less";
import { MDContent } from "../../components/MDContentNav";
import { Nav } from "../../components/Nav";
import {
  AsideProvider,
  AsideContext,
  DisplayMode,
} from "../../components/Aside";
import React, { useContext } from "react";
import { MD } from "../../components/MD";
import { Sidebar } from "../../components/Sidebar";
function DocsMain(props) {
  console.log(props);
  const ctx = useContext(AsideContext);
  // const Component = pages[manifest[props.page]] || "loading...";
  const Component = props.content;
  return (
    <>
      <Head>
        <title>MC-BUILD - Code of Conduct</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout page="/docs" className={styles.content}>
        <Sidebar></Sidebar>
        {ctx.displayMode === DisplayMode.SINGLE ? (
          <div className={styles.container}>
            <div className={styles.displayContent}>
              <MDContent>
                <MD>{Component}</MD>
                <Nav></Nav>
              </MDContent>
            </div>
          </div>
        ) : (
          <MDContent>
            <Component></Component>
            <Nav></Nav>
          </MDContent>
        )}
      </Layout>
    </>
  );
}
export default function Docs(props) {
  return (
    <AsideProvider>
      <DocsMain {...props}></DocsMain>
    </AsideProvider>
  );
}
import fs from "fs";
import path from "path";
function readDirR(dir) {
  const children = [];
  const files = fs.readdirSync(dir);
  files.forEach((a) => {
    const item = path.join(dir, a);
    if (fs.statSync(item).isDirectory()) {
      children.push(...readDirR(item));
    } else {
      children.push(item);
    }
  });
  return children;
}
const root = path.resolve("./documents/docs");
export const getStaticProps = async (ctx) => {
  const location = ctx.params?.query?.slug?.join?.("/") || ["home"];
  return {
    props:{
      page: location,
      content: await fs.promises.readFile(path.join(root,location.join("/")+".md"),"utf-8")
    }
  };
};
export const getStaticPaths = async () => {
  const files = readDirR(path.resolve("./documents/docs")).map((p) =>
    path.relative(root, p).replace(/\\/g, "/").split("/")
  );
  // console.log({ root, files });
  return {
    paths: files.map((_) => {
      return {
        params: {
          slug: _,
        },
      };
    }),
    fallback: true,
  };
};