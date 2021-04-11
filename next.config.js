const withAntdLess = require("next-plugin-antd-less");
const withTM = require("next-transpile-modules")(["@mcb/ui"]);
module.exports = withTM(
  withAntdLess({
    // optional
    lessVarsFilePath: "./ui/global.less",
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {},

    // Other Config Here...

    webpack(config) {
      return config;
    },
  })
);
