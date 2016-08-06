;(function($) {	//	$.fn.attr();  Allows no argument call to return all attributes for each Element in jQuery Element Object
	var original = $.fn.attr
	$.fn.extend({ attr: function () {
		var args = Array.prototype.slice.call(arguments),
			eles = {};
		return args.length ? original.apply(this, args) : ($(this).each(function(i) {
			if (this instanceof Element) {
				var attrs = Array.prototype.slice.call(this.attributes),
					tagName = this.tagName,
					classes = original.apply($(this), ['class']),
					selector = tagName.toLowerCase()+(this.id?'#'+this.id:'')+(this.name?'[name='+this.name+']':'')+(classes?'.'+classes.replace(' ', '.'):'')
					obj = { selector: selector }
				if (!eles[tagName]) eles[tagName] = [];
				for (var x in attrs) {
					var nodeName = attrs[x].nodeName;
					obj[nodeName] = original.apply($(this), [nodeName]);
				}
				eles[tagName].push(obj);
			}
		}), eles);
	}	});
})(jQuery);
