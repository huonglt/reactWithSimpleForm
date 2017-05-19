const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  inject: 'body'
})
module.exports = {
	entry: './client/index.js',
	output: {
		path: path.resolve('dist'),
		filename: 'index_bundle.js'
	},

	module: {
		loaders: [
			{ test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.css$/, use: ['style-loader',  {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]'
            }
          },
          'postcss-loader'
        ]
      }
		]
	},
	plugins: [HtmlWebpackPluginConfig]
}
