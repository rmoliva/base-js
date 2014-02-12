NS("BaseJS");

(function() {
  'use strict';
  scaleApp.Core.prototype.log = {
    error: function(exception) {
      console.error(exception.message);
    },
    info: function(exception) {
      console.info(exception.message);
    },
    warn: function(exception) {
      console.warn(exception.message);
    }
  };
})();


BaseJS.app = (function() {
  "use strict";

  var core = null;
  var options = null;

  /* 
   * Inicializa la aplicacion
   * *options*:
   *   *domid*: ID del elemento DOM donde se renderizara
   *   *callback*: funcion que llamara la aplicación con la configuracion
   *      cuando el proceso termine
   */
  var initialize = function(o) {
    options = _.cloneDeep(o);

    // inicializar el scaleApp
    core = new scaleApp.Core();

    // Inicializar los plugins del Core
    BaseJS.corePlugins.init.initialize(core);

    // Inicializar modulos
    BaseJS.modules.init.initialize(core);

    // Inicializar el loader
    core.start("loader", {
        options: options
      },
      _.bind(onLoadedMedia)
    );
  };

  var onLoadedMedia = function() {
    // Parar el loader
    core.stop("loader");
  };

  return {
    initialize: initialize
  };
})();
