var Html = ( function () {
	const MODULE_NAME = "HTML Manager";
	const PLAYABLE_AREA_WIDTH = "900px";
	const PLAYABLE_AREA_HEIGHT = "600px";


	var init = function(){
		console.log("Loading Module ".concat(MODULE_NAME));
		$('body').append("<div id='logo_container' class='logo container'></div>"); // create logo div
		// $('body').append("<div id='border_top'   class='border top'></div>");
		// $('body').append("<div id='border_left'  class='border left'></div>");
		// $('body').append("<div id='border_right' class='border right'></div>");
		// $('body').append("<div id='border_bot'   class='border bot'></div>");
		$('body').append("<div id='playable_area_container' class='playable area container'></div>"); // create playable area div
		$('#playable_area_container').css("width", PLAYABLE_AREA_WIDTH);
		$('#playable_area_container').css("height", PLAYABLE_AREA_HEIGHT);
		$('#logo_container').append("<img class='logo' name='JSQ Logo' src='img/logo.png'>"); // create logo
		$('body').append("<div id='info_container' class='info container'></div>"); // create info div
		$('#info_container').append("<p class ='info message'>JS Quest © 2017 ChickenFeet Productions, Inc. All rights reserved.<br />Please contact Anthony Burton for any business related enquiries.</p>"); // create info		
		$('#info_container').append("<img id='btnToggleLights' class='info lights button'src='img/light4.png'>");
		$('#info_container').css("width", PLAYABLE_AREA_WIDTH);
		SM.pa_container = $('#playable_area_container');
		SM.pa_x_pos = SM.pa_container.offset().left + parseInt(SM.pa_container.css('borderWidth'));
		SM.pa_y_pos = SM.pa_container.offset().top  + parseInt(SM.pa_container.css('borderWidth'));
		SM.pa_width = SM.pa_x_pos + SM.pa_container.width();
		SM.pa_height = SM.pa_y_pos + SM.pa_container.height();
	};


	var toggleLights = function(){
		if (SM.lights){
			$('html').animate({backgroundColor: '#0c2027'}, 1000);
			$('#info_container').animate({color: 'white'}, 1000);
			SM.lights = false;
		}else{			
			$('html').animate({backgroundColor: '#ADD8E6'}, 1000);
			$('#info_container').animate({color: 'black'}, 1000);

			SM.lights = true;
		}
		
	}

	return {
		init: init,
		toggleLights: toggleLights
	};

} () );

Html.init();