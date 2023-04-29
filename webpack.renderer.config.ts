import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.scss$/,
  use: [
    "style-loader", // creates style nodes from JS strings
    {
      loader: "css-loader",
      options: {
        modules: true,
      }
    }, // translates CSS into CommonJS
    "sass-loader" // compiles Sass to CSS
  ]
});

rules.push({
  test: /\.(png|svg|jpg|gif)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'images/',
        publicPath: '../images/'
      }
    }
  ]
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    modules: ["node_modules", __dirname],
    alias: {
      "@hooks": "src/hooks",
      "@component": "src/component",
      "@store": "src/store",
      "@util": "src/util",
      "@interface": "src/interface.ts",
      "@constant": "src/constant.ts",
    }
  },
};
