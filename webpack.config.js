const path = require("path")
const HtmlWebPackPlugin=require("html-webpack-plugin")
module.exports = {
    entry:{
        create_prod:"./src/create_prod_react.js",
        login_controller:"./src/login_controller.js",
        mycart:"./src/mycart_react.js",
        user_reg:"./src/user_reg.js",
        prod_listing:"./src/prod_listing.js",
        billing:"./src/billing.js",
    },
    output:{
        filename:"[name].bundle.js",
        path:path.resolve(__dirname+"/public/javascripts/react_files/")
    },
    devtool:"inline-source-map",
    watch:true,
    devServer:{
    }
    ,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
			{
				test:/\.html$/,
				use:[{
					loader:"html-loader"
				}]
			}
        ]
    },
    optimization:{
        splitChunks:{
            chunks:"async",
            cacheGroups:{
                vendors:{
                    reuseExistingChunk:true
                }
            }
        }
    },
	plugins:[
	/*	new HtmlWebPackPlugin({
			template:"./src/index.html",
			filename:"./index.html"
		})*/
	]
}