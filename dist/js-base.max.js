/*! js-base - v0.0.1 - 2014-11-15 */NS('BaseJS.corePlugins');

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

BaseJS.corePlugins.init = (function() {
    'use strict';

    var initialize = function(core) {
        core.use(BaseJS.corePlugins.ScaleAppMedia);

    };

    return {
        initialize: initialize
    };
})();
;this["JST"] = this["JST"] || {};

this["JST"]["avatar/templates/loader.hjs"] = Handlebars.template(function(Handlebars, depth0, helpers, partials, data) {
    this.compilerInfo = [4, '>= 1.0.0'];
    helpers = this.merge(helpers, Handlebars.helpers);
    data = data || {};



    return "<div class='avatar_loader'>\n  \n  <div class='avatar_dial_div'>\n    <input class='dial loader_progress' type=\"text\" readonly=\"readonly\" data-readOnly=true/>\n  </div>\n  \n  <div class='avatar_name_div'>\n    Loading: <span class='loader_name' /> <span class='loader_loaded' />/<span class='loader_total' />\n  </div>\n  \n</div>\n";
});
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
;NS('BaseJS.modules');

BaseJS.modules.init = (function() {
    'use strict';

    var modules = {
        loader: BaseJS.modules.loader.Module
    };

    /**
     * Registra todos los módulos de la aplicación Configurations en scaleApp
     */
    var initialize = function(core) {
        // Registrar los modulos en el application
        _.each(modules, function(module, name) {
            core.register(name, module);
        });
    };

    /**
     * Parar los modulos y desregistrar todos
     */
    var destroy = function(core) {
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
})();
;NS('BaseJS.media');

BaseJS.media = (function() {
    "use strict";

    // Array de los objetos imagenes
    var images = {};

    // Guardar los tamaños de las imagenes
    var images_sizes = {};

    // Array de los objetos sonido
    // var sounds = {};

    // Archivos cargados
    var loaded = 0;

    // Total de mendios a cargar
    var total = 0;

    // Objeto encargado de la gestion de sonido
    // var sound_object = null;

    // Array con las fuentes a cargar 
    var fonts = ["Lato", "Lato Bold", "Lato Regular"];


    var setTotal = function(media_hash) {
        // total = (Object.keys(media_hash.images).length + Object.keys(media_hash.sounds).length) + fonts.length;
        total = Object.keys(media_hash.images).length + fonts.length;
    };

    var publishProgress = function(core, name) {
        core.emit("progressMedia", {
            total: total,
            loaded: loaded,
            progress: (loaded * 100) / total,
            name: name
        });
    };

    // La siguiente funcion devuelve el hash con los elementos
    // Que hay que cargar por defecto
    var allMedia = function(options) {
        var default_assets = {
            images: {},
            sounds: {},
            videos: {}
        };

        // Hay que cargar los elementos estandar tambien
        var media_hash = _.merge(default_assets, options.assets);

        // Poner la ruta completa de los assets
        _.each(media_hash.images, function(value, key) {
            media_hash.images[key] = options.dirs.images + "/" + value;
        }, this);

        _.each(media_hash.sounds, function(value, key) {
            media_hash.images[key] = options.dirs.sounds + "/" + value;
        }, this);

        _.each(media_hash.videos, function(value, key) {
            media_hash.images[key] = options.dirs.videos + "/" + value;
        }, this);
        return media_hash;
    };

    /* 
     * *options*
     *  *assets* : Es un hash de arrays con las imagenes, audios y videos
     *    con ruta relativa a la carpeta de assets
     *
     *  *dirs* : Es la carpeta donde se encuentra cada asset
     *    {
     *      images: '../',
     *      sounds: '../',
     *      videos: '../'
     *    }
     * *callback* : metodo que será llamado cuando termine la carga
     */
    var loadMedia = function(core, options) {
        var media_hash = allMedia(options);


        // cargar el motor de sonidos
        // sound_object = new SoundLibrary.Tablet(core.browser.is_tablet());

        // Calcular el total de medios a cargar
        setTotal(media_hash);

        // Notificar progreso de carga
        publishProgress(core);

        loadImages(core, media_hash.images).then(
            loadFonts(core, fonts)
        ).done(options.callback);

        //      // loadSounds(core, media_hash.sounds),

        //    loadImages(core, media_hash.images)., function() {
        //      if (!_.isEmpty(media_hash.images)) {
        //        console.log("Cargadas imagenes: " + Object.keys(media_hash.images).join(', '));
        //      }

        // Cargar ahora las fuentes
        //      loadFonts(core, fonts, options.callback);

        // Cargar ahora los sonidos
        /* loadSounds(core, media_hash.sounds, function() {
        // Cargar ahora las fuentes
        loadFonts(core, fonts, result);
      }); */
        //    });
    };

    var loadImagePromise = function(core, key, url) {
        return new Promise(function(resolve, reject) {
            var image = new Image();
            image.onload = function(e) {
                loaded = loaded + 1;

                // Notificar del progreso
                publishProgress(core, url);

                // Guardar el tamaño de las imagenes
                var size = {
                    w: this.width,
                    h: this.height
                };
                images_sizes[key] = size;
                images[key] = this;
                resolve();
            };
            image.onerror = reject;
            image.src = url;
            return image;
        });
    };

    var loadImages = function(core, images_hash) {
        // Hay que cargar todas las imagenes
        var p = [];

        p = _.map(images_hash, function(url, key) {
            return loadImagePromise(core, key, url);
        });

        return Promise.all(p);
    };


    /*  var loadSounds = function(core, sound_hash, result) {

    _.each(sound_hash, function(value, key) {
      sounds[key] = sound_object.createAudio(key, value);
      loaded = loaded + 1;

      // Notificar del progreso
      publishProgress(core, value);
    });

    result();
  };
*/
    var loadFonts = function(core, families_array, result) {
        return new Promise(function(resolve, reject) {
            WebFont.load({
                google: {
                    families: families_array
                },
                active: function() {
                    resolve(); // Terminar cuando se han cargado todas
                },
                // Notificar mediante progreso segun se van cargando
                fontactive: function(familyName, fvd) {
                    loaded = loaded + 1;

                    // Notificar del progreso
                    publishProgress(core, familyName);
                }
            });
        });
    };

    /*  var getSoundLibrary = function() {
    return sound_object;
  };
*/
    var getImage = function(key) {
        return images[key];
    };

    var getImages = function() {
        return images;
    };

    var getImageSize = function(key) {
        return images_sizes[key];
    };

    /*  var getSound = function(key) {
    //console.log(sounds)
    return sounds[key];
  };
*/
    var destroy = function() {
        // Liberando imagenes
        _.each(Object.keys(images), function(key) {
            images[key] = null;
        });

        // Liberando sonidos
        //sound_object.destroy();
    };

    return {
        loadMedia: loadMedia,
        //    getSoundLibrary: getSoundLibrary,
        getImage: getImage,
        getImageSize: getImageSize,
        //    getSound: getSound,
        getImages: getImages,
        destroy: destroy
    };
})();
;NS("BaseJS");


BaseJS.promises = (function() {

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

    return {
        moduleStart: moduleStart,
        moduleStop: moduleStop,
        timeout: timeout
    };
}());
;NS("BaseJS");

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

        BaseJS.promises.moduleStart(core, "loader", options).then(function() {
            return BaseJS.promises.moduleStop(core, "loader");
        }).done();

    };

    return {
        initialize: initialize
    };
})();
