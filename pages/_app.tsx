import "@mcb/ui/global.less";
import App from "next/app";
import { ThemeProvider, useUniqueValue } from "../ui";
import React from "react";

function MyApp({ Component, pageProps, cookie }) {
  useUniqueValue.reset();
  return (
    <ThemeProvider>
      <Component {...pageProps} cookie={cookie} />
    </ThemeProvider>
  );
}
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.origGetInitialProps(appContext);
  let res = {
    cookie: appContext.ctx.req?.headers?.cookie ?? "NO COOKIE",
    ...appProps,
  };
  return res;
};
export default MyApp;
