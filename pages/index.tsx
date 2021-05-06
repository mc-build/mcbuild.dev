import Head from "next/head";
import { Button, ButtonType, Layout, Logo } from "../ui";
import styles from "./index.module.less";
import Transition from "../assets/transition.svg";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  return (
    //this could be a fragment but this has to be a node for the theme transition to work properly
    <div>
      <Head>
        <title>MC-BUILD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout page="/" className={styles.content}>
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.col}>
              <h1>MC-BUILD</h1>
              <h3>A Minecraft datapack build tool!</h3>

              <p className={styles.concept}>
                <strong>Familiar Syntax</strong>
              </p>
              <p className={styles.concept}>
                <strong>No More File jumping!</strong>
              </p>
              <p className={styles.description}>
                The mc-language was designed to be similar to the mcfunction
                language with some extras thrown in.
              </p>
              <div className={styles.buttons}>
                <div>
                  <Button
                    type={ButtonType.FULL}
                    onClick={() => {
                      router.push("/docs");
                    }}
                  >
                    Docs
                  </Button>
                </div>
                <div>
                  <Button
                    type={ButtonType.EMPTY}
                    onClick={() => {
                      router.push("/discord");
                    }}
                  >
                    Discord
                  </Button>
                </div>
              </div>
            </div>
            <div className={styles.transition}>
              {/*
               // TODO: FIX THIS MESS! 
               */}
              <Transition />
            </div>
          </div>
          <div className={styles.logo}>
            <Logo size={512} style={{ transform: "scaleX(-1)" }} />
          </div>
        </div>
      </Layout>
    </div>
  );
}
