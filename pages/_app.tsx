import "@mcb/ui/global.less";
import App from "next/app";
import { ThemeProvider, useUniqueValue } from "../ui";
import { MDXProvider } from "@mdx-js/react";
import MDStyles from "../styles/md.module.less";
import React from "react";
function asMD(Type: string, cname?: string) {
  const AsMD = (props) => (
    <Type
      className={
        MDStyles[cname || Type] ||
        (process.env.NODE_ENV === "development"
          ? cname || "md-" + Type
          : undefined)
      }
      {...props}
    ></Type>
  );
  AsMD.type = Type;
  return AsMD;
}
const asHeader = (Type: string) => {
  const Component: { (props: any): JSX.Element; type: string } = asMD(Type);
  const AsHeader = (props) => {
    const content = props.children.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    const permLink = content;
    return (
      <section id={permLink}>
        <Component>
          <a href={"#" + permLink} className={MDStyles.permLink}>
            <svg
              width="27"
              height="18"
              viewBox="0 0 27 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.4 10.8H7.2V12.6H5.4C2.7 12.6 0 9.558 0 6.3C0 3.042 2.79 0 5.4 0H12.6C15.21 0 18 3.042 18 6.3C18 8.838 16.362 11.196 14.4 12.15V10.062C15.444 9.252 16.2 7.776 16.2 6.3C16.2 3.996 14.364 1.8 12.6 1.8H5.4C3.636 1.8 1.8 3.996 1.8 6.3C1.8 8.604 3.6 10.8 5.4 10.8ZM21.6 5.4H19.8V7.2H21.6C23.4 7.2 25.2 9.396 25.2 11.7C25.2 14.004 23.364 16.2 21.6 16.2H14.4C12.636 16.2 10.8 14.004 10.8 11.7C10.8 10.206 11.556 8.748 12.6 7.938V5.85C10.638 6.804 9 9.162 9 11.7C9 14.958 11.79 18 14.4 18H21.6C24.21 18 27 14.958 27 11.7C27 8.442 24.3 5.4 21.6 5.4Z"
                fill="#60A5FA"
              />
            </svg>
          </a>
          &nbsp;
          {props.children}
        </Component>
      </section>
    );
  };
  return AsHeader;
};
const components = {
  //header
  h1: asHeader("h1"),
  h2: asHeader("h2"),
  h3: asHeader("h3"),
  h4: asHeader("h4"),
  h5: asHeader("h5"),
  h6: asHeader("h6"),
  //list
  ul: asMD("ul"),
  ol: asMD("ol"),
  li: asMD("li"),
  //table
  table: asMD("table"),
  thead: asMD("thead"),
  tbody: asMD("tbody"),
  tr: asMD("tr"),
  td: asMD("td"),
  th: asMD("th"),
  //code
  code: asMD("code"),
  inlineCode: asMD("code", "inlineCode"),
  pre: asMD("pre"),
  //common
  blockquote: asMD("blockquote"),
  em: asMD("em"),
  strong: asMD("strong"),
  del: asMD("strike"),
  hr: asMD("hr"),
  p: asMD("p"),
  a: asMD("a"),
  img: asMD("img"),
};
function MyApp({ Component, pageProps, cookie }) {
  useUniqueValue.reset();
  return (
    <MDXProvider components={components}>
      <ThemeProvider>
        <Component {...pageProps} cookie={cookie} />
      </ThemeProvider>
    </MDXProvider>
  );
}
console.log(React);
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  let res = {
    cookie: appContext.ctx.req?.headers?.cookie ?? "NO COOKIE",
    ...appProps,
  };
  return res;
};
export default MyApp;
