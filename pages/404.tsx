import Head from "next/head";
import Link from "next/link";
import { Layout,Button,ButtonType } from "../ui";
import styles from "./404.module.less";
export default function Conduct() {
  return (
    <>
      <Head>
        <title>MC-BUILD - 404</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout page="/404" className={styles.container}>
      <div className={styles.main}>
          <h1>404</h1>
          <p>Page not found.</p>
        </div>
        <hr/>
        <div className={styles.buttons}>
          <Link href={"/"}>
            <a>
              <Button>Home</Button>
            </a>
          </Link>
          <Link href={"/docs/home"}>
            <a>
              <Button type={ButtonType.EMPTY}>Docs</Button>
            </a>
          </Link>
        </div>
      </Layout>
    </>
  );
}
