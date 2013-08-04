define([
    'core/util/log',
    'jquery',
    'lib-third-party/handlebars.runtime' //causes issue if another module uses 'handlebars'
], function (log, $, handlebars) {
    log('core module loaded');
    var core = {};

    return core;
});