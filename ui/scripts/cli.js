const path = require("path");
const fs = require("fs");
const name = process.argv[2];
if (name.indexOf(" ") > -1) {
  throw new Error("invalid name");
}

const out = path.resolve(".", "ui", "components", name.toLowerCase());
const index = path.resolve(".", "ui", "index.ts");
const component = path.resolve(out, `${name}.tsx`);
const story = path.resolve(out, `${name}.stories.tsx`);
const less = path.resolve(out, `${name}.module.less`);
fs.mkdirSync(out);
fs.writeFileSync(
  component,
  `import styles from "./${name}.module.less";

export interface I${name}Props {
  color: string;
}

export function ${name}({ color = "red" }: I${name}Props) {
  return (
    <div style={{ color }} className={styles.example}>
      Example!!!!!!
    </div>
  );
}`
);
fs.writeFileSync(
  story,
  `import React from "react";
import { ${name} } from "./${name}";

export default {
  title: "mc-build/${name}",
  component: ${name},
};
export const ${name}Story = (props) => <${name} {...props}></${name}>;
`
);
fs.writeFileSync(
  less,
  `.example {
    border: 1px solid black;
    padding: 1em;
    background-color: magenta;
  }
`
);
const indexContent = [
  ...Array.from(
    new Set(
      fs
        .readFileSync(index, "utf8")
        .split("\n")
        .map((_) => _.trim())
        .filter(Boolean)
    ).keys()
  ),
  `export * from "./components/${name.toLowerCase()}/${name}";`,
]
  .sort((a, b) => a.localeCompare(b))
  .join("\n");
fs.writeFileSync(index, indexContent);
