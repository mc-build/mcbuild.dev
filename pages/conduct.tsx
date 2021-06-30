import Head from "next/head";
import { Layout } from "../ui";
import styles from "./conduct.module.less";
import MDXContent from "../documents/conduct.md";
import { MDContent } from "../components/MDContentNav";
import { Nav } from "../components/Nav";
import { MD } from "../components/MD";
export default function Conduct() {
  const content = (
    <MDContent>
      <Nav></Nav>
      <MD>{MDXContent}</MD>
    </MDContent>
  );
  return (
    <>
      <Head>
        <title>MC-BUILD - Code of Conduct</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout page="/conduct" className={styles.content}>
        <div className={styles.container}>
          <div className={styles.conduct}>{content}</div>
        </div>
      </Layout>
    </>
  );
}
