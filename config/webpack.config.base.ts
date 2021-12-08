import * as path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';

const config: webpack.Configuration = {
	entry: {
		main: './src/index.tsx'
	},
	output: {
		filename: 'static/js/[name].[contenthash].bundle.js',
		chunkFilename: 'static/js/[name].[contenthash].chunk.js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.js', '.tsx', '.json'],
		alias: {
			'@': path.resolve(__dirname, '../src'),
			'#': path.resolve(__dirname, '../public/images'),
		}
	}
};

export default config;