function hashString(str) {
  var hash = 0,
    i,
    chr;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
const fs = require("fs");
const path = require("path");
function readDir(dir) {
  const items = fs.readdirSync(dir);
  const res = [];
  for (let item of items) {
    const loc = path.resolve(dir, item);
    if (fs.lstatSync(loc).isDirectory()) {
      res.push(...readDir(loc));
    } else {
      res.push(loc);
    }
  }
  return res;
}
function getTree(dir) {
  const items = fs.readdirSync(dir);
  const res = {};
  for (let item of items) {
    const loc = path.resolve(dir, item);
    if (fs.lstatSync(loc).isDirectory()) {
      res[item] = getTree(loc);
    } else {
      if (item.endsWith(".md")) {
        res[item.replace(/\.md$/, "")] = [
          path
            .relative("./documents/docs", loc)
            .replace(/\\/g, "/")
            .replace(/\.md/g, ""),
          item.replace(/\.md/g, ""),
        ];
      }
    }
  }
  return res;
}
const paths = readDir("./documents/docs").map((_) =>
  path.relative(path.resolve("./documents/docs"), _).replace(/\\/g, "/")
);
const mappings = {};
let code = `//generated file, run yarn generate:docs to regenerate.\nconst localMeta:Record<string,any> = {};\n`;
for (let i = 0; i < paths.length; i++) {
  const pth = paths[i];
  if (pth.endsWith(".md")) {
    const hash = "var_" + hashString(pth).toString(36).replace(/-/g, "_");
    mappings[pth.replace(/\.md$/, "")] = hash;
    code += `import ${hash} from "../documents/docs/${pth}";\nexport {${hash}};\n`;
    if (fs.existsSync(path.resolve("./documents/docs", pth + ".json"))) {
      code += `localMeta.${hash}=${JSON.stringify(
        require(path.resolve("./documents/docs", pth + ".json"))
      )};\n`;
    }
  }
}
code += `export const manifest = ${JSON.stringify(mappings, null, 2)}\n`;
console.log(Array.from(new Set(Object.values(mappings))));
code += `export const meta = {
    ${Array.from(new Set(Object.values(mappings))).map(
      (_) => `get ${_}(){
        return localMeta.${_};
    }`
    )}
}\nexport const sidebarList = ${JSON.stringify(
  getTree("./documents/docs"),
  null,
  2
)}`;
fs.writeFileSync("./generated/docsPages.ts", code);
