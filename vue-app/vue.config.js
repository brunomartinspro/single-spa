const { defineConfig } = require('@vue/cli-service')
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    output: {
      libraryTarget: 'system',
    },
   
    plugins: [
      new WebpackManifestPlugin({
        publicPath: "",
        generate: (_seed, files, entrypoints) => {
          for (let entrypoint in entrypoints) {
            const mainjs = files.filter(
              (file) => file.name === entrypoint + ".js"
            )[0].path;
            return {
              mainjs: mainjs
            };
          }
        },
      }),
    ]
  },
 
})
