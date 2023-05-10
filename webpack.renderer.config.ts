import type { Configuration } from 'webpack'

import merge from 'webpack-merge'
import type IForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { commonConfig } from './webpack.common.config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

export const rendererConfig: Configuration = merge(commonConfig, {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]-[hash]'
                            }
                        }
                    }, // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS
                ]
            },
            {
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
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            logger: 'webpack-infrastructure'
        })
    ]
})
