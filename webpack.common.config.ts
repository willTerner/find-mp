import type { Configuration } from 'webpack'

export const commonConfig: Configuration = {
    module: {
        rules: [
            // Add support for native node modules
            {
            // We're specifying native_modules in the test because the asset relocator loader generates a
            // "fake" .node file which is really a cjs file.
                test: /native_modules[/\\].+\.node$/,
                use: 'node-loader'
            },
            {
                test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
                parser: { amd: false },
                use: {
                    loader: '@vercel/webpack-asset-relocator-loader',
                    options: {
                        outputAssetBase: 'native_modules'
                    }
                }
            },
            {
                test: /\.tsx?$/,
                exclude: /(node_modules|\.webpack)/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
        modules: ['node_modules', __dirname],
        alias: {
            '@hooks': 'src/hooks',
            '@component': 'src/component',
            '@store': 'src/store',
            '@util': 'src/util',
            '@interface': 'src/interface.ts',
            '@constant': 'src/constant.ts',
            '@pages': 'src/pages',
            '@layout': 'src/layout'
        }
    }
}
