const path = require('path')

module.exports = {
  assetsPath: path.resolve(__dirname, '../assets'),
  buildPath: path.resolve(__dirname, '../build'),
  distPath: path.resolve(__dirname, '../dist'),
  entryMain: path.resolve(__dirname, '../main/index.ts'),
  entryRenderer: path.resolve(__dirname, '../src/index.tsx'),
  indexTemplate: path.resolve(__dirname, '../src/index.html'),
  stylePaths: [path.resolve(__dirname, '../src/styles')],
  sourcePath: path.resolve(__dirname, '../src'),
  tsconfigMain: path.resolve(__dirname, '../main/tsconfig.json'),
  tsconfigRenderer: path.resolve(__dirname, '../src/tsconfig.json'),
}
