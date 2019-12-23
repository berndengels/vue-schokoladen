const mix = require('laravel-mix');
require('laravel-mix-dload');
require('mix-env-file');

mix
    .download({
        enabled: true,
        urls: [
            {
                'url': 'http://schoki2.loc/api/spa/events',
                'dest': 'src/js/store/server/events',
            },
            {
                'url': 'http://schoki2.loc/api/spa/events/category/musik',
                'dest': 'src/js/store/server/events',
            },
            {
                'url': 'http://schoki2.loc/api/spa/events/category/lesung',
                'dest': 'src/js/store/server/events',
            },
            {
                'url': 'http://schoki2.loc/api/spa/events/category/party',
                'dest': 'src/js/store/server/events',
            },
            {
                'url': 'http://schoki2.loc/api/spa/menu/top',
                'dest': 'src/js/store/server/menu',
            },
            {
                'url': 'http://schoki2.loc/api/spa/menu/bottom',
                'dest': 'src/js/store/server/menu',
            },
            {
                'url': 'http://schoki2.loc/api/spa/pages',
                'dest': 'src/js/store/server/pages',
            },
            {
                'url': 'http://schoki2.loc/api/spa/page/routes',
                'dest': 'src/js/store/server/routes',
            },
            {
                'url': 'http://schoki2.loc/api/spa/contact/bands/fields',
                'dest': 'src/js/store/server/form/contact/bands',
            },
        ],
    })
;
