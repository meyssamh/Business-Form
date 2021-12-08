import * as path from 'path';
import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import baseWebpack from './webpack.config.base';

const productionConfig: webpack.Configuration = merge(
	baseWebpack,
	{
		mode: 'production',
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
							loader: MiniCssExtractPlugin.loader
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
				template: path.resolve(__dirname, '../public/index.html'),
				title: 'Business Form',
				favicon: './public/favicon.ico',
			}),
			new MiniCssExtractPlugin({
				filename: 'static/css/[name].[contenthash].css',
				chunkFilename: 'static/css/[name].[contenthash].chunk.css',
				ignoreOrder: true
			})
		]
	}
);

export default productionConfig;