import Head from "next/head";
import { Layout } from "../ui";
import styles from "./conduct.module.less";
import MDXContent from "../documents/conduct.mdx";
console.log(MDXContent);
export default function Home() {
  const content = <MDXContent></MDXContent>;
  console.log(content);
  return (
    //this could be a fragment but this has to be a node for the theme transition to work properly
    <div>
      <Head>
        <title>MC-BUILD - Code of Conduct</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout page="/conduct" className={styles.content}>
        <div className={styles.container}>
          <div className={styles.conduct}>{content}</div>
        </div>
      </Layout>
    </div>
  );
}
