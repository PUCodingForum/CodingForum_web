const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "https://bakerychu.com/api",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
