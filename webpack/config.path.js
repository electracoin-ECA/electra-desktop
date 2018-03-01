const path = require('path');

module.exports = {
  entry: path.resolve('src/index.tsx'),
  sourcePath: path.resolve('src'),
  buildPath: path.resolve('dist'),
  libraryPath: path.resolve('library'),
  demo: path.resolve('demo'),
  indexTemplate: path.resolve('src/index.html'),
  stylePaths: [
    path.resolve('src/app/styles')
  ]
}
