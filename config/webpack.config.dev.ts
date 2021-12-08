import * as path from 'path';
import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

import baseWebpack from './webpack.config.base';

const developmentConfig: webpack.Configuration = merge(
	baseWebpack,
	{
		mode: 'development',
		devServer: {
			port: 3000,
			hot: true,
			client: {
				overlay: true,
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.(ts|tsx)$/,
					exclude: /node_modules/,
					loader: 'ts-loader'
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: 'style-loader'
						},
						{
							loader: 'css-loader'
						}
					]
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, '../public/index.html')
			}),
		]
	}
);

export default developmentConfig;