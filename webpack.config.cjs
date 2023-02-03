
//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

   resolve: {
      fallback: {
         
      }
   },

   //Left is OUTPUT -- Right is INPUT
   entry: {
     '/public/weather/js/weatherMain.js': '/public/weather/js/weatherMain.jsx',
   //   'public/weather/css/style.css': '/public/weather/css/style.css',
     '/server.cjs': "/server.js"
   },

   output: {
      path: path.join(__dirname + '/dist'),
      filename: '[name]'
   },



   devServer: {
      port: 8080
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            use: ['babel-loader']
         },
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
         },

         {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader?name=public/weather/images/[name].[ext]',
              },
            ],
          },

         { test: /\.css$/, 
         use: [ 'style-loader', 'css-loader' ] 
         },
         {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath: '/public/weather/fonts/'
                }
              }
            ]
          }


      ]
   },

   plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html'
      })
    ]

}
