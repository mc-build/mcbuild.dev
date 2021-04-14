const withAntdLess = require("next-plugin-antd-less");
const withTM = require("next-transpile-modules")(["@mcb/ui"]);
const withImages = require("next-images");
const withSvgr = require("next-plugin-svgr");
module.exports = withSvgr(
  withImages(
    withTM(
      withAntdLess({
        fileExtensions: ["png"],
        lessVarsFilePath: "./ui/global.less",
        cssLoaderOptions: {},

        webpack(config) {
          return config;
        },
      })
    )
  )
);
