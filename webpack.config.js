const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('@kooneko/livereload-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

module.exports = (env, argv) => {
  const pluginsToAdd = [];
  const webpackMode = argv.mode;

  pluginsToAdd.push(new CleanWebpackPlugin());
  pluginsToAdd.push(
    new HtmlWebpackPlugin({
      template: './src/auth.html',
      filename: 'auth.html'
    })
  );
  pluginsToAdd.push(
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  );
  pluginsToAdd.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './sdk-config.json',
          to: './'
        },
        {
          from: './src/helpers/auth.js',
          to: './'
        },
        {
          from: './assets/icons/*',
          to() {
            return Promise.resolve('constellation/icons/[name].[ext]');
          }
        },
        {
          from: './assets/css/*',
          to: './'
        },
        {
          from: './assets/img/*',
          to: './'
        },
        {
          from: './assets/fonts/*',
          to: './'
        },
        {
          from: './node_modules/@pega/constellationjs/dist/bootstrap-shell.js',
          to: './constellation'
        },
        {
          from: './node_modules/@pega/constellationjs/dist/bootstrap-shell.*.*',
          to() {
            return Promise.resolve("constellation/[name].[ext]");
          }
        },        {
          from: './node_modules/@pega/constellationjs/dist/lib_asset.json',
          to: './constellation'
        },
        {
          from: './node_modules/@pega/constellationjs/dist/constellation-core.*.*',
          to() {
            return Promise.resolve('constellation/prerequisite/[name].[ext]');
          }
        }
      ]
    })
  );

  // Enable gzip and brotli compression
  //  Exclude constellation-core and bootstrap-shell files since
  //    client receives these files in gzip and brotli format
  pluginsToAdd.push(
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.ts$|\.css$|\.html$/,
      exclude: /constellation-core.*.js|bootstrap-shell.js/,
      threshold: 10240,
      minRatio: 0.8
    })
  );
  pluginsToAdd.push(
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|ts|css|html|svg)$/,
      exclude: /constellation-core.*.js|bootstrap-shell.js/,
      compressionOptions: {
        params: {
          [zlib.constants.BROTLI_PARAM_QUALITY]: 11
        }
      },
      threshold: 10240,
      minRatio: 0.8
    })
  );

  if (webpackMode === 'development') {
    // In development mode, add LiveReload plug
    //  When run in conjunction with build-with-watch,
    //  This will reload the browser when code is changed/re-compiled
    const liveReloadOptions = {
      protocol: 'http',
      appendScriptTag: true,
      delay: 400,
      hostname: 'localhost'
    };
    pluginsToAdd.push(new LiveReloadPlugin(liveReloadOptions));
  }

  // need to set mode to 'development' to get LiveReload to work
  //  and for debugger statements to not be stripped out of the bundle
  initConfig = {
    mode: 'development',
    entry: {
      app: './src/index.tsx'
    },
    devServer: {
      static: path.join(__dirname, 'dist'), // was called contentBase in earlier versions
      historyApiFallback: true,
      host: 'localhost',
      port: 3502,
      open: false
    },
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    plugins: pluginsToAdd,
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.jsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'node_modules/react-datepicker'),
          ],
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.s[a|c]ss$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
        },
        { test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 8192 } },
        {
          test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loader: 'url-loader',
          options: { limit: 10000, mimetype: 'application/font-woff2' }
        },
        {
          test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
          loader: 'url-loader',
          options: { limit: 10000, mimetype: 'application/font-woff' }
        },
        { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx']
    }
  };
  return initConfig;
};
