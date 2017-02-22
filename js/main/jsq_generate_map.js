var GenerateMap = ( function () {
	const MODULE_NAME = "Map Generation";

	const PLAY_AREA_WIDTH  = 500; 
	const PLAY_AREA_HEIGHT = 500; 

	var init = function(){
		console.log("Loading Module ".concat(MODULE_NAME));
		var width  = $( window ).width();
		var height = $( window ).height();

	};
	return {
		init: init
	};
} () );

GenerateMap.init();