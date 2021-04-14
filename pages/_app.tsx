import "@mcb/ui/global.less";
import { ThemeProvider, useUniqueValue } from "../ui";
function MyApp({ Component, pageProps }) {
  useUniqueValue.reset();
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
