const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;
const { merge } = require("webpack-merge");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const SystemJSPublicPathWebpackPlugin = require("systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin");

module.exports = (angularWebpackConfig, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(
    angularWebpackConfig,
    options
  );
  const customConfig = {
    plugins: [
      new WebpackManifestPlugin({
        generate: (seed, files, entrypoints) => {
          const mainEntryPath = files.find(
            (file) => file.name === "main.js"
          ).path;
          return {
            mainjs: mainEntryPath,
            visibleWhen: {
              isAuthenticated: true,
            },
          };
        },
      }),
      // Required for lazy loaded modules to work
      new SystemJSPublicPathWebpackPlugin(),
    ],
  };

  const mergedConfig = merge(singleSpaWebpackConfig, customConfig);

  // Feel free to modify this webpack config however you'd like to
  return mergedConfig;
};
