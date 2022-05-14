/* eslint-disable */

module.exports = {
  target: 'node',
  resolve: {
    fallback: {
      https: require.resolve('https-browserify'),
      // https: false,
    },
  },
  entry: ['./public/src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public/src'),
    publicPath: '/',
    filename: 'bundle.js',
  },
};
