NS('BaseJS');

BaseJS.PluginInit = function(core) {
    'use strict';

    var initialize = function() {
        core.use(BaseJS.corePlugins.ScaleAppPromises);

    };

    return {
        initialize: initialize
    };
};
