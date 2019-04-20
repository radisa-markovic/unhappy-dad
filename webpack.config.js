const path = require('path');

module.exports = {
    entry: './src/index.js',
    devtool: "inline-source-map",
    mode: "development",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: "dist"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                loader: 'babel-loader',
                
                options: 
                {
                    presets: 
                    [
                      '@babel/preset-env',
                      {
                        plugins:
                         [
                          '@babel/plugin-proposal-class-properties'
                         ]
                      }
                    ]
                },
            }
        ]
    }
};