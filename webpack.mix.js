const mix = require('laravel-mix');
require('laravel-mix-polyfill');

if (process.env.section) {
    require(`${__dirname}/webpack.mix.${process.env.section}.js`);
} else {
    mix.webpackConfig({
        node: {
            fs: 'empty',
        },
        module: {
            rules: [{
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }]
        }
    });
    mix
        .js('src/js/app.js', 'public/js')
        .sass('src/sass/app.scss', 'public/css')
        .polyfill({
            enabled: true,
            useBuiltIns: 'usage',
            targets: {
                'firefox': '50',
                'chrome': '58',
                'ie': 11,
            }
        })
        .minify(['public/js/app.js','public/css/app.css'])
        .copy('images', 'public/images')
    ;
}
if(process.env.NODE_ENV === "development") {
//    mix.browserSync('vue-schoki.loc')
}
