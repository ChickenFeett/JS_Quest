var GenMap = ( function () {
	const MODULE_NAME = "Map Generation";

	const PLAY_AREA_WIDTH  = 500; 
	const PLAY_AREA_HEIGHT = 500; 

	var init = function(){
		console.log("Loading Module ".concat(MODULE_NAME));
	};
	var loadMap = function(mapFile){
	 	$.ajax({
	        url: mapFile,
	        async: false, // replace with async: true at some point and add loading screens
			success: function(result){
				var i, x = 0, y = 0, len = result.length;
	        	for (i = 0; i < len; i++){
	        		var char = result[i];
	        		// Remeber lines end in "\r\n". Char @ index ([line len] - 1) is \r, index (line len) is \n. 
	        		if (/\n/.exec(result[i])){ // therefore only check for \n, which is the final char of the line.
	        			y ++;
	        			x = 0;
	        		}
	        		else{
		        		var xPos = (SM.DEFAULT.WIDTH  * x) + SM.pa_x_pos;
		        		var yPos = (SM.DEFAULT.HEIGHT * y) + SM.pa_y_pos;
		        		_loadObject(result[i], xPos, yPos, SM.DEFAULT.WIDTH, SM.DEFAULT.HEIGHT); 
		        		x ++ ;
		        	}
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
	var _loadObject = function(objectType, xPos, yPos, width, height){
		switch (objectType){
			case SM.MAP_OBJ.WALL:
				ObjMgmt.createNewObject(SM.PATH.WALL, SM.ID_NAME.WALL, 0, 0, xPos, yPos, width, height, 0, 0, 0, SM.N, 100);
				break;
			case SM.MAP_OBJ.GRASS:
				rand = Math.random();
				threshold = 0.1;
				path = rand < .5 ? SM.PATH.GRASS_PLAIN2: SM.PATH.GRASS_PLAIN1;
				if      (rand < threshold*1){ path = SM.PATH.GRASS_FEATURE1; }
				else if (rand < threshold*2){ path = SM.PATH.GRASS_FEATURE2; }
				else if (rand < threshold*3){ path = SM.PATH.GRASS_FEATURE3; }
				else if (rand < threshold*4){ path = SM.PATH.GRASS_FEATURE4; }
				
				

				Math.random(); SM.PATH.GRASS
				ObjMgmt.createNewObject(path, SM.ID_NAME.GRASS, 0, 0, xPos, yPos, width, height, 0, 0, 0, SM.N, 0);
				break;	
		}
	}

	return {
		init: init,
		loadMap: loadMap
	};
} () );

GenMap.init();