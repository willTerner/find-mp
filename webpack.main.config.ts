
import { commonConfig } from './webpack.common.config'
// eslint-disable-next-line import/default
import CopyPlugin from 'copy-webpack-plugin'
import merge from 'webpack-merge'

export const mainConfig = merge(commonConfig, {
    /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
    entry: './src/index.ts',
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: 'predictor',
                to: 'predictor'
            }]
        })
    ]
})
