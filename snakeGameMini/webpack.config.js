/** 
*  @type {import('webpack').Configuration}
*/
// 引入path包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
// 引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",
    // 打包输出文件路径
    output: {
        // 指定路径
        path: path.resolve(__dirname,'dist'),
        // 输出文件名称
        filename: 'bundle.js',
        // 相关环境要求
        environment: {
            // 不允许有箭头函数
            arrowFunction: false,
            // 禁止使用const
            const: false
        }
    },
    // 打包所使用的模块
    module: {
        // 指定相关loader的加载规则
        rules: [
            // ts配置
            {
                // 以ts结尾的文件
                test: /\.ts$/,
                // 配置信息
                use: [
                    {
                        // 指定环境插件
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        // 指定兼容的浏览器
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11",
                                        },
                                        // 指定corejs的版本
                                        "corejs": "3",
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 排除所需的模块包
                exclude: /node-modules/
            },
            // less文件处理 css部分
            {
                test: /\.less$/,
                use: [
                    // 注意先后顺序
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // 兼容最新的两个版本
                                            browsers: "last 2 version"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]

            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    // 将此两个猴嘴的文件识别为模块
    resolve: {
        extensions: ['.ts','.js']
    },
    mode: 'development'
}   

