import path from 'path'
import webpack from 'webpack'
import merge from 'lodash.merge'

const DEBUG = !process.argv.includes('--release')
const VERBOSE = process.argv.includes('--verbose')
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
}
const JS_LOADER = {
  test: /\.jsx?$/,
  include: [
    path.resolve(__dirname, '../src'),
  ],
  loader: 'babel-loader',
}

const config = {
  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.txt$/,
        loader: 'raw-loader',
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      }, {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
    ],
  },
}

const serverConfig = merge({}, config, {
  target: 'node',
  externals: [
    function filter(context, request, cb) {
      const isExternal =
        request.match(/^[a-z][a-z\/\.\-0-9]*$/i) &&
        !request.match(/^react-routing/) &&
        !context.match(/[\\/]react-routing/)
      cb(null, Boolean(isExternal))
    },
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  devtool: 'source-map',
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin(GLOBALS),
    new webpack.BannerPlugin('require("source-map-support").install()',
      { raw: true, entryOnly: false }),
  ],
  module: {
    loaders: [
      JS_LOADER,
      ...config.module.loaders,
      {
        test: /\.css$/,
        loader: 'css-loader!postcss-loader',
      },
    ],
  },
})

const indexConfig = merge({}, serverConfig, {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
})

export default [indexConfig]