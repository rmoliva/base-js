this["JST"] = this["JST"] || {};

this["JST"]["avatar/templates/loader.hjs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class='avatar_loader'>\n  \n  <div class='avatar_dial_div'>\n    <input class='dial loader_progress' type=\"text\" readonly=\"readonly\" data-readOnly=true/>\n  </div>\n  \n  <div class='avatar_name_div'>\n    Loading: <span class='loader_name' /> <span class='loader_loaded' />/<span class='loader_total' />\n  </div>\n  \n</div>\n";
  });