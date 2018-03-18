const path = require('path')

module.exports = {
  assets: path.resolve('src/assets/images'),
  buildPath: path.resolve('dist'),
  entry: path.resolve('src/index.tsx'),
  entryMain: path.resolve(__dirname, '../main/index.ts'),
  indexTemplate: path.resolve('src/index.html'),
  libraryPath: path.resolve('library'),
  stylePaths: [path.resolve('src/app/styles')],
  sourcePath: path.resolve('src'),
  tsconfigMain: path.resolve(__dirname, '../main/tsconfig.json'),
  tsconfigRenderer: path.resolve(__dirname, '../src/tsconfig.json'),
}

console.log(path.resolve(__dirname, '../main/index.ts'))
