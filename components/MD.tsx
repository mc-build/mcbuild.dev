import { useContext, useEffect, useRef } from "react";
import { MDContentContext } from "../components/MDContentNav";
import MDStyles from "../styles/md.module.less";
// import ReactMarkdown from "react-markdown";
// import rd from "remark-directive";
import markdownit from "markdown-it";
import container from "markdown-it-container";
const md = markdownit();
md.use(container, "aside", {
  validate: function (params) {
    return params.trim().match(/^aside$/);
  },
});
if (globalThis) globalThis.md = md;
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
const str = (node) =>
  typeof node === "string"
    ? node
    : node.children.flat(Infinity).map(str).join("");
const asHeader = (Type: string) => {
  const Component: { (props: any): JSX.Element; type: string } = asMD(Type);
  const AsHeader = (props) => {
    const content = str(props.node);
    const headerRef = useRef<number>(null);
    const { addHeader } = useContext(MDContentContext);
    const permLink =
      Type.substr(1) + "-" + content.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
    useEffect(() => {
      headerRef.current = addHeader(
        {
          id: permLink,
          name: props.children as string,
          level: parseInt(Type.substr(1)),
        },
        headerRef.current
      );
    }, []);

    return (
      <section id={permLink} title={content}>
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
          {props.children}
        </Component>
      </section>
    );
  };
  return AsHeader;
};
const special_types = {
  container_aside: ({ children }) => {
    return <div className={"lolz"}>{children}</div>;
  },
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

  html: asMD("div"),
};
function treeify(tokens) {
  const res = [];
  let current = [];
  while (tokens.length) {
    let cur = current.length > 0 ? current[current.length - 1] : null;
    let token = tokens.shift();
    if (token.type === "text") {
      if (cur) cur.children.push(token.content);
      else res.push(token.content);
    } else if (token.type === "inline") {
      if (cur) cur.children.push(treeify(token.children));
      else res.push(treeify(token.children));
    } else if (token.type.endsWith("_open")) {
      const type = token.tag;
      current.push({
        element: type,
        children: [],
        type: token.type.substr(0, token.type.length - 5),
        raw: token,
      });
    } else if (token.type.endsWith("_close")) {
      const item = current.pop();
      if (current.length) {
        current[current.length - 1].children.push(item);
      } else {
        res.push(item);
      }
    }
  }
  return res;
}
const MDElement = ({ nodes }) => {
  return nodes.flat(Infinity).map((item, idx) => {
    if (typeof item === "string") return item;
    const Node =
      components[item.element] || special_types[item.type];
    if (!Node) {
      const El = item.element;
      return (
        <El key={idx}>
          <MDElement nodes={item.children} />
        </El>
      );
    }
    if(Node.type){
      return (
        <Node key={idx}>
          <MDElement nodes={item.children} />
        </Node>
      );
    }
    return (
      <Node key={idx} node={item}>
        <MDElement nodes={item.children} />
      </Node>
    );
  });
};

export const MD = ({ children }) => {
  const {reset} = useContext(MDContentContext);
  const mdstring = typeof children === "string" ? children : ((children||[])[0] || "*No Markdown Content Found*");
  const parsed = treeify(md.parse(mdstring));
  useEffect(()=>{
    reset();
  },[]);
  return <MDElement nodes={parsed} />;
};
