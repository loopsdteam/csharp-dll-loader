module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        appId: 'loopSolution.csharp-dll-loader'
      },
      externals: [
        'electron-edge-js'
      ],
      nodeModulesPath: [
        '../../node_modules',
        './node_modules'
      ]
    },
    configureWebpack: {
      devtool: 'source-map'
    }
  }
}
