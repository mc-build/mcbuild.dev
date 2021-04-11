/**
 * Export a function. Accept the base config as the only param.
 *
 * @param {Parameters<typeof rootWebpackConfig>[0]} options
 */
module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.module\.less$/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
        options: {
          localsConvention: "camelCase",
          modules: {
            mode: "local",
            localIdentName: "[local]--[hash:base64:5]",
          },
        },
      },
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
    //include: path.resolve(__dirname, '../src/'),
  });

  config.module.rules.push({
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: [
      {
        loader: "style-loader",
      },
      {
        loader: "css-loader",
        options: {},
      },
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
    //include: path.resolve(__dirname, '../src/'),
  });
  config.resolve.extensions.push(".ts", ".tsx");
  // Remove original less loader

  // config.module.rules = config.module.rules.filter((f) => {
  //   console.log('IS THIS LESS?', f.test)
  //   return f.test.toString() !== '/\\.less$/'
  // })

  config.devtool = "inline-source-map";

  //config.cssModules = true;
  return config;
};
