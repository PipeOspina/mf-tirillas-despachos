const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

const port = process.env.PORT || 8080;

module.exports = ({ test }, { mode }) => {
    const production = !!(mode === 'production');

    return {
        context: path.resolve(__dirname, 'src'),
        entry: {
            app: './index.tsx',
        },
        output: {
            path: path.join(__dirname, '/public'),
            filename: 'index.bundle.js',
        },
        devServer: {
            port,
            watchContentBase: true,
        },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(js?x|ts|png|jpe?g|gif|json|txt|svg)$/i,
                    use: {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'tsx',
                            sourcemap: !production,
                            target: 'es2016',
                            minify: production,
                            charset: 'utf8',
                        },
                    },
                },
                {
                    test: /\.(tsx)$/,
                    use: {
                        loader: 'esbuild-loader',
                        options: {
                            loader: 'tsx',
                            sourcemap: !production,
                            target: 'es2016',
                            minify: production,
                            charset: 'utf8',
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'esbuild-loader',
                            options: {
                                loader: 'css',
                                minify: production,
                            },
                        },
                    ],
                },
            ],
        },
        optimization: {
            minimize: production,
            minimizer: production
                ? [
                    new ESBuildMinifyPlugin({
                        target: 'es2015',
                        css: true,
                    }),
                ]
                : undefined,
        },
        plugins: [
            new HtmlWebpackPlugin({ template: './index.html' }),
            new MiniCssExtractPlugin(),
            new Dotenv({
                path: test ? './.env.test' : `./.env.${mode}`,
            }),
        ],
        performance: production
            ? {
                hints: false,
                maxEntrypointSize: 512000,
                maxAssetSize: 512000,
            }
            : undefined,
    };
};
