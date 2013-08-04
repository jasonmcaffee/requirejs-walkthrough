define([
    'core/core',
    'handlebars' //causes issue if another module uses 'lib-third-party/handlebars.runtime'
], function (core, handlebars) {
    core.log('Home View module loaded');

    var View = {
        id: 'home', // each view needs a unique id for transitions.
        template: null,
        events: {
            "click": function (e) {

            }
        }
    };

    return View;
});