const withAntdLess = require("next-plugin-antd-less");
const withTM = require("next-transpile-modules")(["@mcb/ui"]);
const withImages = require("next-images");
const withSvgr = require("next-plugin-svgr");
const withMDX = require("@next/mdx")();
module.exports = withSvgr(
  withImages(
    withTM(
      withAntdLess({
        fileExtensions: ["png"],
        lessVarsFilePath: "./ui/global.less",
        cssLoaderOptions: {},

        webpack(config) {
          config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
          });
          return config;
        },
        async redirects() {
          return [
            {
              source: '/docs',
              destination: '/docs/home',
              permanent: true,
            },
            {
              source: '/discord',
              destination: 'https://discord.gg/kpGqTDX',
              permanent: true,
            },
          ]
        },
      })
    )
  )
);
