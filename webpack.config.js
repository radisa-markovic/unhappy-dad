const path = require('path');

//inace ovo moze i da se napise u typescriptu, al to cu nekom drugom prilikom, ima na netu kako se radi

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map', //za debagovanje, pogledati Britanca
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [ path.resolve(__dirname, "src") ] /*kompajliranje samo .ts fajlova iz src foldera*/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'] //da bi znao kako da resolve-uje fajlove, tipa drugi import u index.ts
    },
    output: {
        publicPath: 'public', //da bi bilo hot-reload-a, pogledati onog Britanca
        filename: "bundle.js",
        path: path.resolve(__dirname, "public")
    }
};