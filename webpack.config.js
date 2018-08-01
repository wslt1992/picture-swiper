/**
 * Created by Administrator on 2018/6/16/016.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode:'development',
    entry: {
        app: './src/js/index.js',
    },
    output: {
        // publicPath: './',
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                // exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                    //   presets: ['env']
                      presets: ['env']
                    }
                  }
              },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.(png|jpg|gif|svg)/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1024,
                        outputPath: 'imgs/'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8,
                        outputPath: 'font/'
                    }
                }]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '天猫',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(['dist']),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/plugins/layui'),
            to:path.resolve(__dirname,"dist")
        },
        {
            from: path.resolve(__dirname, 'src/imgs'),
            to:path.resolve(__dirname,"dist/imgs")
        },
        {
            from: path.resolve(__dirname, 'src/font'),
            to:path.resolve(__dirname,"dist/font")
        },
        
    ]),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        
    ],
    devtool: 'eval',
    // devtool:'inline-source-map',
    devServer: {
        contentBase: './dist',
        // hot:true,
        host: '192.168.1.15',
        inline: true,
        port: 8047,
    }

};