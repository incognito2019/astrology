$(document).ready(function(){
	setMainMenu();
	setPreloader();
    cookiesAlert();
    modal()
});

/**
 * Modal
 */
function modal(){
    var $modals = $('.modal');

    $modals.each(function(){
        var $modal = $(this),
            $open_btns = $('[data-target="#' + $modal.attr('id') + '"'),
            $close_btns = $modal.find('[data-dismiss="modal"]');

        $open_btns.each(function(){
            $(this).on('click', function(event){
                event.preventDefault();

                $modal.fadeIn(500, function(){
                	$('body').addClass('modal-open');
				});
            })
        });

        $close_btns.each(function(){
            $(this).on('click', function(event){
                event.preventDefault();

                $modal.fadeOut(500, function(){
                    $('body').removeClass('modal-open');
                });
            })
        });
    })
}

/**
 * Cookies info pane
 */
function cookiesAlert(){
    var opts = {
        class: "cookies-alert",
    }

    var $alerts = $('.' + opts.class);

    $alerts.each(function(i){
        var $alert = $(this),
            $btn = $alert.find('.' + opts.class + '__close-btn');

        $btn.on('click', function(){
            $.cookie(opts.class, i, {expires: 1});

            $alert.addClass(opts.class + '--hidden');
        });
    });
}

/**
 * Preloader
 */
function setPreloader(){
	var $preload_pane = $('.preload_pane');

	var noScroll = function(){
		window.scrollTo(0, 0);
	}

	$(window).bind('scroll', noScroll);

	$(window).on('load', function(){
		$preload_pane.fadeOut();
		$(window).unbind('scroll', noScroll);
	});
}

function setMainMenu(){
	var $top_bar = $('.top_bar'),
		$banner = $('.menu_marker'),
		$menu_pane = $('.main_menu'),
		$open_btn = $top_bar.find('.open_mm_btn'),
		$close_btn = $menu_pane.find('.close_mm_btn');

	var set = function(){
		if($(window).scrollTop() < $banner.outerHeight()){
			$top_bar.removeClass('fixed');
		}else{
			$top_bar.addClass('fixed');
		}
	}

	set();
	$(window).on('load scroll', function(){
		set();
	});

	$open_btn.on('click', function(){
		$menu_pane.addClass('visible');
	});
	$close_btn.on('click', function(){
		$menu_pane.removeClass('visible');
	});
}

function setTopBanner(){
	fitWindowHeight('.top_banner');

	var $top_banner = $('.top_banner'),
		$mouse_btn = $top_banner.find('.scroll_btn');

	$mouse_btn.on('click', function(){
		scrollPageTo($top_banner.next(), 350, 0);
	});
}

function highlightMenu(index){
	$('nav a').eq(index).addClass('active');
}

function setAboutUsStages(){
	var $els = $('.stages_pane .record');

	$(window).on('load scroll', function(){
		$els.each(function(){
			var $el = $(this);

			if(isHalfInView($el.get(0))){
				$el.addClass('visible');
			}
		});
	});
}

function setTeamList(){
	var $els = $('.astronauts_pane .record');

	$.each($els, function(){
		var $el = $(this);

		$el.on('click', function(){
			$el.toggleClass('active');
		});

		$el.on('mouseout', function(){
			$el.removeClass('active');
		});
	});
}

function setListHighlight(els){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		var $els;
		var position;

		var set = function(){
			console.log('set')
			$els = $(els);
			position = [];

			$els.each(function(){
				position.push([$(this).offset().top, ($(this).offset().top + $(this).height())]);
			});

			$(window).on('scroll', function(){
				var middle = $(this).scrollTop() + window.innerHeight / 2;

				$.each(position, function(index, value){
					var $el = $(this);

					if(middle > value[0] && middle < value[1]){
						$els.eq(index).addClass('active');
					} else {
						$els.eq(index).removeClass('active');
					}
				});
			});
		}

		set();
		$(window).on('resize', function(){
			set();
		});
	}
}
//
// function customGoogleMap(selected_zoom){
// 	var styleArray = [
// 		{"featureType": "road", "elementType": "geometry.fill", "stylers": [{"color": "#000000"}]},
// 		{"featureType": "poi", "elementType": "geometry.fill", "stylers": [{"color": "#404040"}]},
// 		{"featureType": "landscape", "elementType": "geometry.fill", "stylers": [{"color": "#2b2b2b"}]},
// 		{"elementType": "labels.text.stroke", "stylers": [{"visibility": "off"}]},
// 		{"elementType": "labels.text.fill", "stylers": [{"color": "#ffffff"}]},
// 		{"featureType": "road", "elementType": "geometry.stroke",	"stylers": [{"color": "#4b4b4b"}]},
// 		{"elementType": "labels.icon", "stylers": [{"visibility": "off"}]},
// 		{"featureType": "water", "stylers": [{"color": "#808080"}]}
// 	];
//
// 	var location = new google.maps.LatLng(41.178844,-8.681627);
// 	var map_options = { zoom: selected_zoom, disableDefaultUI:true, center: location, scrollwheel: false };
// 	var map = new google.maps.Map(document.getElementById("google-map"), map_options);
//
// 	map.setOptions({styles: styleArray});
//
// 	var marker_options = { position: location, map: map, title: "A nossa rampa de lançamento!", icon:'Assets/Images/Icons/map_marker.png'},
// 		marker = new google.maps.Marker(marker_options);
// }


/**
 * Custom Google map
 */
function customGoogleMap(map_id, locations) {

    if(locations.length){
		 var styleArray = [
		 		{"featureType": "road", "elementType": "geometry.fill", "stylers": [{"color": "#000000"}]},
		 		{"featureType": "poi", "elementType": "geometry.fill", "stylers": [{"color": "#404040"}]},
		 		{"featureType": "landscape", "elementType": "geometry.fill", "stylers": [{"color": "#2b2b2b"}]},
		 		{"elementType": "labels.text.stroke", "stylers": [{"visibility": "off"}]},
		 		{"elementType": "labels.text.fill", "stylers": [{"color": "#ffffff"}]},
		 		{"featureType": "road", "elementType": "geometry.stroke",	"stylers": [{"color": "#4b4b4b"}]},
		 		{"elementType": "labels.icon", "stylers": [{"visibility": "off"}]},
		 		{"featureType": "water", "stylers": [{"color": "#808080"}]}
		 	];

        var map_options = {
            disableDefaultUI: false,
            scrollwheel: false
        };

        /*
         * If there's only only one location set, we must set the zoom and
         * center the map according to the first location coordinates
         */
        if(locations.length == 1){
            map_options.zoom = 14;
            map_options.center = new google.maps.LatLng(locations[0][1], locations[0][2]);
        }

        var map = new google.maps.Map(document.getElementById(map_id), map_options);
        var icon = {
           url: 'Assets/Images/Icons/map_marker.png', // url
           scaledSize: new google.maps.Size(60, 70), // scaled size
           origin: new google.maps.Point(0,0), // origin
           anchor: new google.maps.Point(0, 0) // anchor
        };

        if(locations.length > 1)
        {
            var bounds = new google.maps.LatLngBounds();
        }

        for(i = 0; i < locations.length; i++)
        {
            var marker = new google.maps.Marker(
                {
                    title:      locations[i][0],
                    position:   new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map:        map,
                   icon:        icon
                }
            );

            if(locations.length > 1){
                bounds.extend(marker.position);
            }
        }

        if(locations.length > 1){
            map.fitBounds(bounds);
        }

        map.setOptions({
            styles: styleArray
        });
    }else{
        console.log('No locations found!');
    }
}
function scrollPageTo(el, speed, delay){
	window.setTimeout(function(){
		$('html, body').animate({
			scrollTop: $(el).offset().top
		}, speed);
	}, delay);
}

function scrollPageToTopBarBottom(el, speed, delay){
	window.setTimeout(function(){
		$('html, body').animate({
			scrollTop: $(el).offset().top - $('.top_bar').outerHeight()
		}, speed);
	}, delay);
}

function isInView(el){
	var $el = $(el);

	var w_top = $(window).scrollTop(),
		w_bottom = w_top + window.innerHeight;

	var el_top = $el.offset().top;
	var el_bottom = el_top + $el.height();

	return (el_top <= w_bottom);
}

function isHalfInView(el){
	var $el = $(el);

	var w_top = $(window).scrollTop(),
		w_bottom = w_top + window.innerHeight;

	var el_top = $el.offset().top;
	var el_bottom = el_top + $el.height() / 2;

	return (el_bottom <= w_bottom);
}

function fitElsToParent(image){
	var $image = $(image).eq(0);
	var image = $image.get(0);

	var $parent = $image.parent();

	var ratio = $image.height() / $image.width();

	var parent_width = $parent.width();
	var parent_height = $parent.height();

	if((parent_height / parent_width) > ratio){
		$image.height(parent_height);
		$image.width(parent_height / ratio);
	}else{
		$image.width(parent_width);
		$image.height(parent_width * ratio);
	}

	$(image).css({
		left: (parent_width - $image.width()) / 2,
		top: (parent_height - $image.height()) / 2,
		opacity: 1
	});
}

function fitWindowHeight(el){
	var $el = $(el);

	var fit = function(){
		$el.height(window.innerHeight);
	}

	fit();

	$(window).on('resize', function(){
		fit();
	});
}

/**
 *	Show elements on scroll
 */
function showOnScroll() {
    var $els = $('.show-on-scroll');

    if ($els.length) {
        var opts = {
            active_class: 'show-on-scroll--active',
            idle_class: 'show-on-scroll--idle',
            delay: 300,
        }

        var setEls = function() {
            var $active_els = $els.filter(function(){
                return !$(this).hasClass(opts.active_class) && !$(this).hasClass(opts.idle_class) && isInView($(this));
            });

            $active_els.addClass(opts.idle_class);

            $active_els.each(function(i){
                var $el = $(this);

                window.setTimeout(function(){
                    $el.addClass(opts.active_class);
                }, opts.delay * i);
            });
        }

        var isInView = function(el) {
            var $el = $(el);

            var w_top = $(window).scrollTop();
            var w_bottom = w_top + window.innerHeight;

            var el_top = $el.offset().top;

            return (el_top < w_bottom);
        }

        setEls();

        $(window).on('load scroll resize', function() {
            setEls();
        });
    }
}
