const mix = require('laravel-mix');

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
mix
    .js('src/js/app.js', 'public/js')
    .sass('src/sass/app.scss', 'public/css')
;
