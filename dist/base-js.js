/*! base-js - v0.0.1 - 2014-11-21 */(function() {
    'use strict';

    function reportError(error, message) {
        message = message || '';
        console.error(
            'ERROR: ' + message + ' [' + error.toString() + ']\n' +
            '\nName:\t\t' + (error.name || '-') +
            '\nMessage:\t' + (error.message || '-') +
            '\nFile:\t\t\t' + (error.fileName || '-') +
            '\nSource:\t\t' + ((error.toSource && error.toSource()) || '-') +
            '\nLine #:\t\t' + (error.lineNumber || '-') +
            '\nColumn #:\t' + (error.columnNumber || '-') +
            '\n\nStack:\n\n' + (error.stack || '-'));
    }

    window.onerror = function(message, filename, lineno, colno, error) {
        error.fileName = error.fileName || filename || null;
        error.lineNumber = error.lineNumber || lineno || null;
        error.columnNumber = error.columnNumber || colno || null;
        reportError(error, 'Uncatched Exception');
    };

    scaleApp.Core.prototype.log = {
        error: function(exception) {
            reportError(exception, 'scaleApp.error');
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
;NS('BaseJS.components.thing.Thing');

BaseJS.components.thing.Thing = React.createClass({
    displayName: 'Thing',
    render: function() {
        return (
            React.createElement("p", null, this.props.name)
        );
    }
});
;NS('BaseJS.components.thing.ThingList');

BaseJS.components.thing.ThingList = React.createClass({
    displayName: 'ThingList',
    render: function() {
        return (
            React.createElement("h1", null, "My Things:"),
            React.createElement(BaseJS.components.thing.Thing, {
                name: "Hello World!"
            })
        );
    }
});
;NS('BaseJS.corePlugins');

BaseJS.corePlugins.ScaleAppMedia = function(core, options) {
    'use strict';

    /* Inicializar el plugin
     */
    var onPluginInit = function(instanceSandbox, options) {};

    /* Liberar medios
     */
    var onPluginDestroy = function() {};

    // Extender el core
    _.extend(core, {
        media: BaseJS.media
    }, this);

    // Extender el sandbox
    _.extend(core.Sandbox.prototype, {
        media: BaseJS.media
    }, this);

    return {
        init: onPluginInit,
        destroy: onPluginDestroy
    };
};
;NS('BaseJS.corePlugins');

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
;NS('BaseJS.modules.layout');

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
;NS('BaseJS.modules.loader');

BaseJS.modules.loader.Module = function(sb) {
    'use strict';

    var $el = null;
    var template = 'avatar/templates/loader.hjs';

    var initialize = function(opts, done) {
        $el = $(opts.el);

        var default_dirs = {
            images: '../assets/',
            sounds: '../assets/',
            videos: '../assets/'
        }, images = {};

        // Renderizar la plantilla de handlebars
        var html = JST[template]();
        $el.html(html);

        // Subscribirse a la carga
        sb.on("media.progress", _.bind(onMediaProgress));

        sb.media.loadMedia(sb, {
            assets: {
                images: images,
                sounds: {},
                videos: {}
            },
            dirs: _.merge(default_dirs, opts.asset_dirs),
            level: opts.level,
            callback: _.bind(done)
        });
    };

    /* {
      total: total,
      loaded: loaded,
      progress: (loaded * 100) / total,
      name: name      
    }
    */
    var onMediaProgress = function(data, topic) {
        var progress = parseInt(data.progress, 10);

        $('.loader_name').html(data.name);
        $('.loader_loaded').html(data.loaded);
        $('.loader_total').html(data.total);
        //    $('.loader_progress').val(progress);
        $('.loader_progress').trigger('change');
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
;NS('BaseJS');

BaseJS.PluginInit = function(core) {
    'use strict';

    var initialize = function() {
        core.use(BaseJS.corePlugins.ScaleAppPromises);

    };

    return {
        initialize: initialize
    };
};
;NS('BaseJS');

BaseJS.ModuleInit = function(core) {
    'use strict';

    var modules = {
        layout: BaseJS.modules.layout.Module
    };

    /**
     * Registra todos los módulos de la aplicación Configurations en scaleApp
     */
    var initialize = function() {
        // Registrar los modulos en el application
        _.each(modules, function(module, name) {
            core.register(name, module);
        });
    };

    /**
     * Parar los modulos y desregistrar todos
     */
    var destroy = function() {
        var running = core.lsInstances();

        _.each(modules, function(module, name) {
            // Si el modulo esta arrancado, pararlo
            if (_.contains(running, name)) {
                core.stop(name);
            }
        });
    };

    return {
        initialize: initialize,
        destroy: destroy
    };
};
;NS("BaseJS");

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
