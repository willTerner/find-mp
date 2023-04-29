import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
// eslint-disable-next-line import/default
import  CopyPlugin  from 'copy-webpack-plugin'


export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
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
  plugins: [
    new CopyPlugin({
      patterns: [{
        from: 'predictor',
        to: 'predictor'
      }]
    })
  ]
};
