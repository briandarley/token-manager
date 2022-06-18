const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // devServer: {
  //   // https: {
  //   //   key: fs.readFileSync('./certs/example.com+5-key.pem'),
  //   //   cert: fs.readFileSync('./certs/example.com+5.pem'),
  //   // },
  //   // public: 'https://localhost:8080/'
  //   https: true
  // },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            
            
            @import "~/src/assets/scss/styles";
            
            
        `
      }
    }
  }
});


