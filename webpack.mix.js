const mix = require('laravel-mix');


/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('assets/vuejs/main.js', 'vuejs');
mix.setPublicPath('public')
mix.options({ imgLoaderOptions: { enabled: false } })
   //.sass('resources/sass/app.scss', 'public/css');
