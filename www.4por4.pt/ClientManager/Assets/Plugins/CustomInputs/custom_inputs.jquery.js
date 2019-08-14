/*
*	JQuery Custom Inputs Plugin
*	Developed by 4por4
*	Author: José Osório
*/
(function($){
	/*
	*	CUSTOM SELECT
	*/
	$.fn.customSelect = function(options){
		var opts = $.extend( {}, $.fn.customSelect.defaults, options );
		
		// append CSS
		if(!$('#custom_inputs_styles').length){
			var path = $.fn.customInputs.findIncludePath();
			$('head').append('<link id="custom_inputs_styles" rel="stylesheet" type="text/css" href="' + path + 'Assets/' + opts.theme + '.css" media="all">');
		}
		
		return this.each(function(){
			var $el = $(this),
				$wrapper,
				$button;
				
			if(!$el.hasClass('custom_select')){
				$el.addClass('custom_select');
				
				// wrap select box with a customizable div
				$el.wrap('<div class="custom_select">');
				// get jQuery access of the wrapper
				$wrapper = $el.parent();
				
				// create span for the custom button
				$button = $('<span></span>');
				// append button to the wrapper
				$wrapper.append($button);
				// set wrapper's mandatory styles
				$wrapper.css({
					zIndex: 0,
					position: 'relative'
				});
				
				// update selected option on load
				var textNode = document.createTextNode($el.find(':selected').html());
				$wrapper.prepend(textNode);
				
				// style select box
				$el.css({
					width: '100%',
					height: '100%',
					lineHeight: '100%',
					padding: 0,
					border: 'none',
					opacity: 0,
					position: 'absolute',
					top: ($wrapper.innerHeight() - $wrapper.outerHeight()) / 2,
					left: ($wrapper.innerWidth() - $wrapper.outerWidth()) / 2,
					zIndex: 1,
					cursor: $wrapper.css('cursor'),
					color: $wrapper.css('color')
				});
				
				// update selected option on change
				$el.on('change', function(){
					$wrapper.contents().first()[0].data = $el.find(':selected').html();
				});
				
				// change wrapper style on focus/blur
				$el.on('focus', function(){
					$wrapper.addClass('active');
				});
				$el.on('blur', function(){
					$wrapper.removeClass('active');
				});
			}
		});
	};
	
	$.fn.customSelect.defaults = {
		theme:  'light',
	};
	
	
	/*
	*	CUSTOM CHECK BOX
	*/
	$.fn.customCheckBox = function(options){
		var opts = $.extend( {}, $.fn.customCheckBox.defaults, options );
		
		// append CSS
		if(!$('#custom_inputs_styles').length){
			var path = $.fn.customInputs.findIncludePath();
			$('head').append('<link id="custom_inputs_styles" rel="stylesheet" type="text/css" href="' + path + 'Assets/' + opts.theme + '.css">');
		}
		
		return this.each(function(){
			$el = $(this);
			$el.wrap('<div class="custom_checkbox">');
			var $wrapper = $el.parent();
			$wrapper.append('<span></span>');
			var $square = $wrapper.find('span');
			
			if($el.is(':checked')){
				$square.addClass('current');
			}
			
			$el.on('change', function(){
				if(this.checked){
					$square.addClass('current');
				}else{
					$square.removeClass('current');
				}
			});
		});
	};
	
	$.fn.customCheckBox.defaults = {
		theme:  'light',
	};
	
	
	/*
	*	CUSTOM RADIO BUTTON
	*/
	$.fn.customRadioButton = function(options){
		var opts = $.extend( {}, $.fn.customRadioButton.defaults, options );
		
		// append CSS
		if(!$('#custom_inputs_styles').length){
			var path = $.fn.customInputs.findIncludePath();
			$('head').append('<link id="custom_inputs_styles" rel="stylesheet" type="text/css" href="' + path + 'Assets/' + opts.theme + '.css">');
		}
		
		var $els = $(this);
		
		return this.each(function(){
			$el = $(this);
			$el.wrap('<div class="custom_radio">');
			var $wrapper = $el.parent();
			$wrapper.append('<span></span>');
			var $circle = $wrapper.find('span');
			
			if($el.is(':checked')){
				$circle.addClass('current');
			}
			
			$el.change(function(){
				$.each($els, function(){
					if($(this).is(':checked')){
						$(this).parent().find('span').addClass('current');
					}else{
						$(this).parent().find('span').removeClass('current');	
					}
				});
			});
		});
	};
	
	$.fn.customRadioButton.defaults = {
		theme:  'light',
	};
	
	/*
	*	FIND INCLUDE PATH
	*/	
	$.fn.customInputs = function(){};
	$.fn.customInputs.findIncludePath = function(){
		var scripts = document.getElementsByTagName('script'),
			src, path;
			
		for(var i = 0; i < scripts.length; i++){
			var script = scripts[i];
			if(script.src.indexOf('CustomInputs') >= 0){
				src = script.src;
			}
		}
		
		path = src.substr(0, src.lastIndexOf('/') + 1);
		return  path;
	};
}( jQuery ));