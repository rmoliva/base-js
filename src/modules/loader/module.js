NS('BaseJS.modules.loader');

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
