import Head from "next/head";
export default function Home({ cookie }) {
  return (
    <div className="AAA">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>cookie: {cookie}</p>
      {cookie.includes("LOL") && <p>haha</p>}
    </div>
  );
}
