/**
 * @file Returns a slugified string
 * @version 1.0.0
 * @author {@link http://github.com/furzeface Daniel Furze}
 */

Handlebars.registerHelper('slugify', function (component, options) {
  /**
  * Return a slug for a DOM id or class.
  * @function slugify
  * @memberof Handlebars.helpers
  * @param {string} component - string to slugify.
  * @example
  * // returns stuff-in-the-title-lots-more
  * Handlebars.helpers.slugify('Stuff in the TiTlE & Lots More');
  * @returns {string} slug
  */
  var slug = component.replace(/[^\w\s]+/gi, '').replace(/ +/gi, '-');

  return slug.toLowerCase();

});
