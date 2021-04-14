import Head from "next/head";
import { Button, ButtonType, Layout } from "../ui";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout page="/">
        <Button type={ButtonType.FULL}>hi</Button>
      </Layout>
    </div>
  );
}
