NS('BaseJS.modules.layout');

BaseJS.modules.layout.Module = function(sb) {
    'use strict';

    var $el = null;

    var initialize = function(opts, done) {
        $el = $(opts.el);

        React.render(
            React.createElement(BaseJS.components.thing.ThingList, null),
            document.querySelector(opts.el)
        );
    };

    var destroy = function() {
        // Quitar la plantilla
        $el.empty();
    };

    return {
        init: initialize,
        destroy: destroy
    };
};
