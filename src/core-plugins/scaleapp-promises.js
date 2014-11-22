NS('BaseJS.corePlugins');

BaseJS.corePlugins.ScaleAppPromises = function(core, options) {
    'use strict';

    var moduleStart = function(core, module, options) {
        return new Promise(function(resolve, error) {
            core.start(module, {
                    options: options
                },
                resolve
            );
        });
    };

    var moduleStop = function(core, module) {
        return new Promise(function(resolve, error) {
            core.stop(module, function() {
                resolve();
            });
        });
    };

    var timeout = function(secs) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, secs * 1000);
        });
    };

    /* Inicializar el plugin
     */
    var onPluginInit = function(instanceSandbox, options) {};

    /* Liberar medios
     */
    var onPluginDestroy = function() {};

    // Extender el core
    _.extend(core, {
        promises: {
            moduleStart: moduleStart,
            moduleStop: moduleStop,
            timeout: timeout
        }
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
        promises: {
            moduleStart: moduleStart,
            moduleStop: moduleStop,
            timeout: timeout
        }
    }, this);

    return {
        init: onPluginInit,
        destroy: onPluginDestroy
    };
};
