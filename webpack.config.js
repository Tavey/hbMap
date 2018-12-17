const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        library: "HBMap",
        libraryTarget: "umd",
        globalObject: "this"
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                use: "vue-loader"
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                use: "babel-loader"
            }
        ]
    },
    mode: "production",
    externals: {
        vue: "vue",
        leaflet: "leaflet"
    },
    plugins: [new VueLoaderPlugin()]
};
