const path = require('path');

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const bundleSizePlugin = require('./write-webpack/bundleSize-plugins')

module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    return {
        entry: [
            path.join(__dirname, './src/main.js')
        ],
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {}
                        // other vue-loader options go here
                    }
                },
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: [
                        "babel-loader",
                        path.resolve(__dirname,'write-webpack/dropConsole-loader.js'),
                  ]
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }]
                },
                {
                    test: /\.scss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new HtmlWebPackPlugin({
                template: path.resolve(__dirname,'./public/index.html'),
                filename: "./index.html"
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new VueLoaderPlugin(),
            new bundleSizePlugin()
        ]
    }
};