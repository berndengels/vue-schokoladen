const mix = require('laravel-mix');
require('mix-env-file');

if (process.env.section) {
    require(`${__dirname}/webpack.mix.${process.env.section}.js`);
} else {
    mix.webpackConfig({
        module: {
            rules: [{
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }]
        }
    });
    mix.env(process.env.ENV_FILE)
        .js('src/js/app.js', 'public/js')
        .sass('src/sass/app.scss', 'public/css')
        .minify(['public/js/app.js','public/css/app.css'])
        .copy('images', 'public/images')
    ;
}
if(process.env.NODE_ENV === "development") {
//    mix.browserSync('vue-schoki.loc')
}
