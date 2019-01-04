const webpack = require('webpack');
const path = require('path');
const HappyPack = require('happypack');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const process = require('process');

function getAllEntryPoints(dirPath) {
  const dirContent = fs.readdirSync(dirPath);
  const files = dirContent.filter(function(item) {
    return /.js$|.ts$/.test(item);
  });

  const multipleEntries = {};
  files.forEach((file) => {
    const fileName = path.parse(file).name;
    const fullFilePath = dirPath + '/' + file;
    multipleEntries[fileName] = fullFilePath;
  })

  return multipleEntries;
}

const distDir = path.resolve(path.join(__dirname, '/cmds'));

console.log('\n\nWebpack Compiling.....\n');

module.exports = {
  // we are building for the node environment
  // removing target: 'node' will cause webpack to build for browser 
  // which means it will resolve standard Node APIs as actual node_modules
  // that will cause errors especially when resolving fs/child_process which are
  // not found in node_moudles
  target: 'node',

  // mode: 'production',

  entry: getAllEntryPoints(path.join(__dirname, './src')),

  output: {
    path:  distDir,
    filename: '[name]'
  },

  resolve: {
    // Add '.ts' as resolvable extension.
    extensions: ['.ts', '.js', '.json'],

    // Enable imports without relative paths.
    // https://moduscreate.com/es6-es2015-import-no-relative-path-webpack/
    modules: [
      path.resolve('.'),
      path.resolve('./node_modules'),
    ]
  },

  module: {
    rules: [
      // All files with '.ts' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.ts$/,
        loader: 'happypack/loader?id=ts'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([distDir], { verbose:  true }),
    new HappyPack({
      id: 'ts',
      threads: 4,
      loaders: [
        {
          path: 'ts-loader',
          query: { happyPackMode: true }
        }
      ]
    }),

    // new UglifyJSPlugin({
    //   test: /.*/,
    //   parallel: true,
    // }),

    new webpack.BannerPlugin({
      // this will be added to top of each chunk of code / each file
      // which will make the file executable
      // banner: '#!/usr/local/bin/node',
      banner: `#!${process.execPath}`,
      raw: true, //set to true to make sure that the banner will not wrapped in a comment
    }),
  ],

  stats: {
    warnings: true
  }
};
