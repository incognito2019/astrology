function setHomepage(str){
	setHomeBanner();
	setWelcomeFrame(str);
	showOnScroll();
	initStatsAnim();
	initWorldAnim();
	
	$('.stats_wrapper').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		prevArrow: '<span class="icon arrow left"></span>',
		nextArrow: '<span class="icon arrow right"></span>',
		responsive: [
			{
				breakpoint: 1010,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},
			{
				breakpoint: 730,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	});
	
	$(".knob.circ_stat").knob({'draw' : function(){$(this.i).val('+' + this.cv)}});
}

function setHomeBanner(str){
	var $mouse_btn = $('#intro_frame .scroll_btn');
		
	$mouse_btn.on('click', function(){
		console.log('scroll down!')
		scrollPageTo('#services_frame', 800, 0);
	});
}

function setWelcomeFrame(str){
	var $frame = $('#intro_frame'),
		$banner = $('.banner');
		
	var str_arr = str.split(',');
		
	var duration = 0, theater_flag = false;	
	
	var setTyping = function(){		
		if($(window).scrollTop() <= $banner.outerHeight()){
			if(!theater_flag){
				theater_flag = true;
				
				var theater = new TheaterJS();
				theater
					.describe("Intro title", { speed: 1.3, accuracy: 1, invincibility: 4 }, "#intro_title")
					.describe("Intro subtitle", { speed: 1.3, accuracy: 1, invincibility: 4 }, "#intro_subtitle")
					.on("say:start, erase:start", function (eventName) {
						var self    = this,
						current = self.current.voice;
						self.utils.addClass(current, "saying");
					})
					.on("say:end, erase:end", function (eventName) {
						var self    = this,
						current = self.current.voice;
						self.utils.removeClass(current, "saying");
					})
					.write("Intro title:" + str_arr[0])
					.write("Intro subtitle:" + str_arr[1]);
			}
		}
	}
	
	setTyping();
	$(window).bind('scroll load', function(){
		setTyping();
	});
}

function initWorldAnim(){
	var $frame = $('#world_frame')
		$map = $frame.find('div.map_wrap')
		$pins = $map.find('span')
		$labels = $frame.find('#map_labels li');
	
	// set mouse hover effect
	$.each($labels, function(i){
		$(this).hover(
			function(){
				$pins.removeClass('active');
				$labels.removeClass('active');
				$pins.eq(i).addClass('active');
			},
			function(){
				$pins.eq(i).removeClass('active');
			}
		);
	});
	$.each($pins, function(i){
		$(this).hover(
			function(){
				$pins.removeClass('active');
				$labels.removeClass('active');
				$labels.eq(i).addClass('active');
			},
			function(){
				$labels.eq(i).removeClass('active');
			}
		);
	});
	
	// random highlight
	window.setInterval(function(){
		var random_nr = Math.floor(Math.random() * $pins.length);
		$pins.removeClass('active');
		$pins.eq(random_nr).addClass('active')
		$labels.removeClass('active');
		$labels.eq(random_nr).addClass('active');
	}, 3000);
}

function initStatsAnim(){
	var $els = $('.knob.circ_stat');
	
	var vals_arr = Array();
	var interval;
	
	var anim_flag = true;
	var anim = false;
	
	$els.each(function(i){
		vals_arr[i] = $els.eq(i).val();
		$els.eq(i).val(0).trigger('change');
	});
	
	$(window).bind('scroll load', function(){
		anim = isInView($('#stats_anim_trigger'));
		if(anim && anim_flag){
			anim_flag = false;
			
			$els.each(function(i){
				$(this).stop().animate({
					value: vals_arr[i]
				},{
					duration: 1500,
					progress: function () {
						$(this).val(Math.round(this.value)).trigger('change');
					}
				});
			});
		}
	});
}