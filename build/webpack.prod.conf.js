var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = config.build.env



function getDateSplit(timstamp) {
    var date = new Date(timstamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var today = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    if (typeof timstamp=="string") {
        return timstamp;
    }
    if (month < 10) {
        month = "0" + month;
    }

    if (today < 10) {
        today = "0" + today;
    }
     if(hour<10){
      hour="0"+hour;
    }

    if(minute<10){
      minute="0"+minute;
    }
    if(second<10){
      second="0"+second;
    }

   return date.getFullYear() + "-"+ month + "-"+ today + " "+ hour+ "：" + minute + "："+ second;
}


function writeDocRms(f) {
return f.toString().replace(/^[^\/]+\/\*!?\s?/, '').replace(/\*\/[^\/]+$/, '').replace('打包日期', getDateSplit(Date.now()));
}
var rmsDoc = writeDocRms(function () {/*

<!------------------------------------------------------------
____    __    ____  _______     _______.___________.     _______      ___   .___________. _______     __  .__   __. .___________. _______ .______      .__   __.  _______ .___________.
\   \  /  \  /   / |   ____|   /       |           |    /  _____|    /   \  |           ||   ____|   |  | |  \ |  | |           ||   ____||   _  \     |  \ |  | |   ____||           |
 \   \/    \/   /  |  |__     |   (----`---|  |----`   |  |  __     /  ^  \ `---|  |----`|  |__      |  | |   \|  | `---|  |----`|  |__   |  |_)  |    |   \|  | |  |__   `---|  |----`
  \            /   |   __|     \   \       |  |        |  | |_ |   /  /_\  \    |  |     |   __|     |  | |  . `  |     |  |     |   __|  |      /     |  . `  | |   __|      |  |     
   \    /\    /    |  |____.----)   |      |  |        |  |__| |  /  _____  \   |  |     |  |____    |  | |  |\   |     |  |     |  |____ |  |\  \----.|  |\   | |  |____     |  |     
    \__/  \__/     |_______|_______/       |__|         \______| /__/     \__\  |__|     |_______|   |__| |__| \__|     |__|     |_______|| _| `._____||__| \__| |_______|    |__|     
                                                                                                                                                                                       
                                                                                          
    本博客采用node开发自动化部署

|   @name       :   vue2博客
|   @desc       :   西门互联
|   @oldweb     :   http://lilidong.cn
|   @author     :   Jackieli
|   @publishDate:   打包日期
|   @copyright  :   ©2017 All Rights Reserved.版权所有.West Gate Internet

-------------------------------------------------------------->                       

*/
});

function htmlSystemInfo(date){
 return rmsDoc
}

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      systemInfo: htmlSystemInfo((Date.now())),    
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
