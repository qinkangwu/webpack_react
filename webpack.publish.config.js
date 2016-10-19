var path = require('path');
var webpack=require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");// 提取样式文件的插件
var HtmlWebpackPlugin = require('html-webpack-plugin');// 创建index页面

//process.env.NODE_ENV="production";

var config={
    // 项目入口文件
    entry:{
        app:path.resolve(__dirname,'src/app.js'),
        //当你的应用依赖其他库尤其是像 React JS 这种大型库的时候，你需要考虑把这些依赖分离出去，这样就能够让用户在你更新应用之后不需要再次下载第三方文件。当满足下面几个情况的时候你就需要这么做了：
        vendors:['react','react-dom']
    },
    // 编译之后的输出路径
    output: {
        path: path.resolve(__dirname, 'publish'),
        filename: 'app.bundle.js'
        //chunkFilename: "[name].js?[hash]-[chunkhash]"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx后缀名的文件
                loader: 'babel',// 加载模块 "babel" 是 "babel-loader" 的缩写
                query: {
                    presets: ['es2015', 'react','stage-0','stage-1','stage-2','stage-3']
                },
                exclude: [path.resolve(__dirname, 'node_modules')] //不需要走过滤器
            },
            // 加载 CSS 需要 css-loader 和 style-loader，他们做两件不同的事情，css-loader会遍历 CSS 文件，然后找到 url() 表达式然后处理他们，style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中。
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.scss$/,
                //loader: 'style!css!sass'
                loader: ExtractTextPlugin.extract("style-loader","css-loader!sass-loader")
            },
            {
                test: /\.(png|jpeg|gif|jpg)$/,
                loader: 'url?limit=8192&name=images/[name].[ext]'  // 如果加参数中间用？号，&号进行多个参数的连接
            }
            //{
            //    test: /\.(png|jpeg|gif|jpg)$/,
            //    loader: 'file-loader?name=images/[name].[ext]'
            //}
        ]
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        //注意一下, extensions 第一个是空字符串! 对应不需要后缀的情况.
        extensions: ['', '.js', '.json', '.scss','jsx']
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("[name].css"),
        new HtmlWebpackPlugin({
            fileName:"index.html",
            //title: 'webpack+react',
            template: './src/template.html',
            files:{
                //    css:[ "app.css" ],
                //    js:[ "vendors.js","bundle.js"]
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.NoErrorsPlugin()
    ]
}

// 动态添加插件的一个方法
if(process.env.NODE_ENV === 'production') {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );
}

module.exports=config;

//Todo:1、chunk和异步加载
//Todo:2、发布优化