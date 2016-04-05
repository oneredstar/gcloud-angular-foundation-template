// directory.
requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../../../bower_components',
        angular: '../../../bower_components/angular/angular',
        jquery: '../../../bower_components/jquery/dist/jquery'
    },
    shim: {
        'lib/foundation-sites/dist/foundation': {
            deps: ['jquery', ]
        },
        'angular': {
            exports: 'angular'
        }
    }
});

define('app', function (require) {
    var angular = require('angular');

    // Foundation plugins
    require('lib/foundation-sites/dist/foundation');

    // Angular Modules
    require('lib/angular-ui-router/release/angular-ui-router');

    var app = angular.module('app', ['ui.router']);

    return app;
});

// Start the main app logic.
require(['jquery', 'angular', 'app'], function ($, angular, app) {
    $().ready(function () {
        $(document).foundation();

        angular.bootstrap(document, ['app']);
    });
});
