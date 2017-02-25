var GenMap = ( function () {
	const MODULE_NAME = "Map Generation";

	const PLAY_AREA_WIDTH  = 500; 
	const PLAY_AREA_HEIGHT = 500; 

	var init = function(){
		console.log("Loading Module ".concat(MODULE_NAME));
		var width  = $( window ).width();
		var height = $( window ).height();		
		
		ObjMgmt.createNewObject("res/walls/wall.png", "wall", 0, 0, SM.pa_x_pos + 100, SM.pa_y_pos + (SM.pa_height/2), 100, 100, 0, 0, 0, SM.N);
	};
	var loadMap = function(mapFile){
		$.ajax({
			path: mapFile,
			async: false,
			success: function(result){
				console.log("Success");
				var i, len = result.length;
	        	console.log(result);
	        	for (i = 0; i < len; i++){
	        		_loadObject(result[i], i); 
	        	}
			},
			error: function(result){
				console.log("Error: Failed to load map data file " + mapFile)
			}
		});
	}

	/* 	Takes the objectType (a predetermined char representing a map object [e.g. w = wall, g = grass]) 
		and check if we support objectType by running through a switch case, then create the new object.
	 	if not supported switch case will just exit and function finishes cleanly. This function will run with '\n' 
		characters for example and that is totally fine.
	*/
	var _loadObject = function(objectType, xPos, yPos){
		switch (objectType){
			case SM.MAP_OBJ.WALL:
				console.log("ooohhh that's nice");
				createNewObject(SM.PATH.WALL, SM.ID_NAME.WALL, 0, 0, xPos, yPos, SM.DEFAULT.WIDTH, SM.DEFAULT.HEIGHT, 0, 0, 0, SM.N);
				break;
			case SM.MAP_OBJ.GRASS:
				createNewObject(SM.PATH.GRASS, SM.ID_NAME.GRASS, 0, 0, xPos, yPos, SM.DEFAULT.WIDTH, SM.DEFAULT.HEIGHT, 0, 0, 0, SM.N);
				break;	
		}
	}

	return {
		init: init,
		loadMap: loadMap
	};
} () );

GenMap.init();