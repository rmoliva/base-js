NS("BaseJS");

BaseJS.app = function(options) {
    "use strict";

    var core = null;
    var plugins = null;
    var modules = null;

    /** 
     * Inicializa la aplicacion
     */
    var initialize = function() {
        // inicializar el scaleApp
        core = new scaleApp.Core();

        // Inicializar los plugins del Core
        plugins = new BaseJS.PluginInit(core);
        plugins.initialize();

        // Inicializar modulos
        modules = new BaseJS.ModuleInit(core);
        modules.initialize();

        // Inicializar el core
        core.boot();

        core.promises.moduleStart(core, "layout", options).then(function() {
            return core.promises.moduleStop(core, "layout");
        }).done();
    };

    var destroy = function() {
        modules.destroy();
        plugins.destroy();
    };

    return {
        initialize: initialize,
        destroy: destroy
    };
};
