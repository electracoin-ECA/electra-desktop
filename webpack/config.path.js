const path = require('path')

module.exports = {
  assets: path.resolve(__dirname, '../src/assets/images'),
  binariesPathFrom: path.resolve(__dirname, '../node_modules/electra-js/bin'),
  binariesPathTo: path.resolve(__dirname, '../dist/bin'),
  buildPath: path.resolve(__dirname, '../dist'),
  entry: path.resolve(__dirname, '../src/index.tsx'),
  entryMain: path.resolve(__dirname, '../main/index.ts'),
  indexTemplate: path.resolve(__dirname, '../src/index.html'),
  libraryPath: path.resolve(__dirname, '../library'),
  outputPathMain: path.resolve(__dirname, '../dist/main'),
  outputPathRenderer: path.resolve(__dirname, '../dist/renderer'),
  stylePaths: [path.resolve(__dirname, '../src/app/styles')],
  sourcePath: path.resolve(__dirname, '../src'),
  tsconfigMain: path.resolve(__dirname, '../main/tsconfig.json'),
  tsconfigRenderer: path.resolve(__dirname, '../src/tsconfig.json'),
}
