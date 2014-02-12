NS('BaseJS.corePlugins');

BaseJS.corePlugins.init = (function() {
  'use strict';

  var initialize = function(core) {
    core.use(BaseJS.corePlugins.ScaleAppMedia);

  };

  return {
    initialize: initialize
  };
})();
