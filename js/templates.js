this["HandlebarsTemplates"] = this["HandlebarsTemplates"] || {};
this["HandlebarsTemplates"]["aside-submenu"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "  <li><a class=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\" href=\"#section-"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</a></li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"-submenu\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.submenu : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});
this["HandlebarsTemplates"]["blog"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "    <li>\n      <div class=\"img -"
    + alias2(alias1((depth0 != null ? depth0.categories : depth0), depth0))
    + "\"></div>\n      <a href=\""
    + alias2(alias1((depth0 != null ? depth0.link : depth0), depth0))
    + "\" target=\"_blank\">\n        <h3>"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</h3>\n        <p>"
    + ((stack1 = alias1((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "</p>\n      </a>\n    </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.blogposts : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n<div class=\"m-blog-link\">\n  <a target=\"_blank\" href=\"http://blog.globalforestwatch.org/\">\n    <svg class=\"icon\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-f-blog\"></use></svg>\n    Read our blog\n  </a>\n</div>\n";
},"useData":true});
this["HandlebarsTemplates"]["gallery"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression;

  return "	      <li data-value=\""
    + alias1(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(this.lambda(depth0, depth0))
    + "</li>	      \n";
},"3":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "			<li class=\"m-card -gallery\">\n				<a href=\""
    + alias2(alias1((depth0 != null ? depth0.href : depth0), depth0))
    + "\" target=\""
    + alias2(alias1((depth0 != null ? depth0.href_target : depth0), depth0))
    + "\">\n					<div class=\"img\">\n						<div style=\"background-image: url("
    + alias2(alias1((depth0 != null ? depth0.thumbnail : depth0), depth0))
    + alias2(alias1((depth0 != null ? depth0.slug : depth0), depth0))
    + ".png)\"> </div>\n					</div>\n					<h3 class=\"-primary\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</h3>\n					<p>"
    + alias2(alias1((depth0 != null ? depth0.source : depth0), depth0))
    + "</p>\n				</a>\n			</li>\n";
},"5":function(depth0,helpers,partials,data) {
    return "		<div id=\"gallery-paginator\"></div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"l-inner\">\n	<div class=\"m-filters\">\n		<ul id=\"galleryFilters\">\n      <li data-value=\"all\">All</li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.filters : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n\n	<ul class=\"m-grid -margin\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.gallery : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.pagination : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "	<a href=\"mailto:gfw@wri.org\" target=\"_blank\" class=\"btn-submit\">\n		<div class=\"-center\">			\n			<svg><use xlink:href=\"#icon-addmore\"></use></svg>\n			<h3>Submit your map or app</h3>\n		</div>\n	</a>\n</div>\n";
},"useData":true});
this["HandlebarsTemplates"]["modal-video"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"modal-backdrop\"></div>\n<div class=\"modal-window -video\">\n  <a href=\"#\" class=\"modal-close\"><svg><use xlink:href=\"#shape-close\"></use></svg></a>\n  <div class=\"modal-wrapper scroll-dark\">\n    <div class=\"modal-content\">\n      <div class=\"modal-video\">\n        <div id=\"modal-video\"></div>\n      </div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});
this["HandlebarsTemplates"]["search"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.results : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "    <li><a href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</a></li>\n";
},"4":function(depth0,helpers,partials,data) {
    return "    <li>No data available</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.results : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});
this["HandlebarsTemplates"]["slider"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=this.escapeExpression;

  return "    <li class=\"item\" data-index=\""
    + alias1(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">"
    + alias1(this.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<ul>\n  <li class=\"item -arrow -left\" data-direction=\"left\"><svg><use xlink:href=\"#icon-arrowleft\"></use></svg></li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.pages : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "  <li class=\"item -arrow -right\" data-direction=\"right\"><svg><use xlink:href=\"#icon-arrowright\"></use></svg></li>\n</ul>\n\n";
},"useData":true});
this["HandlebarsTemplates"]["static"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.escapeExpression;

  return "        <li data-tab=\""
    + alias1(this.lambda(depth0, depth0))
    + "\" class=\"js-static-tab\">\n          "
    + alias1((helpers.deslugify || (depth0 && depth0.deslugify) || helpers.helperMissing).call(depth0,depth0,{"name":"deslugify","hash":{},"data":data}))
    + "\n          <svg><use xlink:href=\"#icon-arrowright\"></use></svg>\n        </li>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.tags : depth0),{"name":"each","hash":{},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    var stack1;

  return "        <div class=\"m-static-info\">\n          "
    + ((stack1 = this.lambda((depth0 != null ? depth0.content : depth0), depth0)) != null ? stack1 : "")
    + "\n        </div>\n";
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return "      <ul class=\"m-static-subtabs\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.tags : depth0),{"name":"each","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "      </ul>\n";
},"7":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "          <li data-tag=\""
    + alias2((helpers.slugify || (depth0 && depth0.slugify) || alias1).call(depth0,(depth0 != null ? depth0.title : depth0),{"name":"slugify","hash":{},"data":data}))
    + "\" class=\"js-static-tag\">\n            <h3 data-tag=\""
    + alias2((helpers.slugify || (depth0 && depth0.slugify) || alias1).call(depth0,(depth0 != null ? depth0.title : depth0),{"name":"slugify","hash":{},"data":data}))
    + "\" class=\"m-static-title\">\n              "
    + alias2((helpers.deslugify || (depth0 && depth0.deslugify) || alias1).call(depth0,(depth0 != null ? depth0.title : depth0),{"name":"deslugify","hash":{},"data":data}))
    + "\n              <div class=\"svg\"><svg><use xlink:href=\"#icon-arrowdown\"></use></svg></div>\n            </h3>\n            <div class=\"m-static-info\">\n              "
    + ((stack1 = this.lambda((depth0 != null ? depth0.content : depth0), depth0)) != null ? stack1 : "")
    + "\n            </div>\n          </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression, alias3=helpers.helperMissing;

  return "<div class=\"l-inner\">\n  <aside class=\"m-static-aside js-static-aside\">\n    <ul>\n\n      <li class=\"-page js-static-page\">\n        <svg><use xlink:href=\"#icon-fast-forward-up\"></use></svg>\n        "
    + alias2(alias1((depth0 != null ? depth0.pageName : depth0), depth0))
    + "\n      </li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.tabs : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n  </aside>\n\n  <div class=\"m-static-content js-static-content\">\n    <div class=\"m-static-content-close js-static-content-close\">\n      <svg><use xlink:href=\"#icon-fast-forward-left\"></use></svg>\n      <span>"
    + alias2(alias1((depth0 != null ? depth0.pageName : depth0), depth0))
    + "</span>\n    </div>\n    <header>\n      <h2 class=\"-"
    + alias2((helpers.deslugify || (depth0 && depth0.deslugify) || alias3).call(depth0,(depth0 != null ? depth0.tab : depth0),{"name":"deslugify","hash":{},"data":data}))
    + "\">"
    + alias2((helpers.deslugify || (depth0 && depth0.deslugify) || alias3).call(depth0,(depth0 != null ? depth0.tab : depth0),{"name":"deslugify","hash":{},"data":data}))
    + "</h2>\n    </header>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.uniq : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>\n";
},"useData":true});