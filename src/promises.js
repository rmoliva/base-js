NS("BaseJS");


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
