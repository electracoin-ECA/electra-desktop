const path = require('path')

module.exports = {
  assetsPath: path.resolve(__dirname, '../src/assets'),
  buildPath: path.resolve(__dirname, '../build'),
  entryMain: path.resolve(__dirname, '../main/index.ts'),
  entryRenderer: path.resolve(__dirname, '../src/index.tsx'),
  indexTemplate: path.resolve(__dirname, '../src/index.html'),
  stylePaths: [path.resolve(__dirname, '../src/app/styles')],
  sourcePath: path.resolve(__dirname, '../src'),
  tsconfigMain: path.resolve(__dirname, '../main/tsconfig.json'),
  tsconfigRenderer: path.resolve(__dirname, '../src/tsconfig.json'),
}
