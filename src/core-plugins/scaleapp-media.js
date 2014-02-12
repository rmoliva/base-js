NS('BaseJS.corePlugins');

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
