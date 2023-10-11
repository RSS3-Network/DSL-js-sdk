/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'umd'),
    library: {
      name: 'rss3',
      type: 'var',
    },
  },
}
