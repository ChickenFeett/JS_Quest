var NPC = ( function () {
	const MODULE_NAME = "NPC Logic";
	
	var init = function(){
		console.log("Loading Module ".concat(MODULE_NAME));
	};
	
	var makeMove = function(){
		var i;
		for (i = 0; i < SM.gEnemies.length; i++){
			var north = false, east = false, south = false, west = false, direction = false;
			if      (SM.gPlayer.xPos + (SM.gPlayer.width/2)  <SM.gEnemies[i].xPos + (SM.gEnemies[i].width/2)  - SM.gEnemies[i].range){ // check if enemy in range in positive x direction
				west = true;
			}
			else if (SM.gPlayer.xPos + (SM.gPlayer.width/2)  > SM.gEnemies[i].xPos + (SM.gEnemies[i].width/2)  + SM.gEnemies[i].range){ // check if enemy in range in negative x direction
				east = true;
			}
			if      (SM.gPlayer.yPos + (SM.gPlayer.height/2) < SM.gEnemies[i].yPos + (SM.gEnemies[i].height/2) - SM.gEnemies[i].range){ // check if enemy in range in positive y direction
				north = true;
			}
			else if (SM.gPlayer.yPos + (SM.gPlayer.height/2) > SM.gEnemies[i].yPos + (SM.gEnemies[i].height/2) + SM.gEnemies[i].range){ // check if enemy in range in negative y direction
				south = true
			}

			if      (!west && !east && !south &&  north){ direction = N;  }
			else if (!west &&  east && !south &&  north){ direction = NE; }
			else if (!west &&  east && !south && !north){ direction = E;  }
			else if (!west &&  east &&  south && !north){ direction = SE; }
			else if (!west && !east &&  south && !north){ direction = S;  }
			else if ( west && !east &&  south && !north){ direction = SW; }
			else if ( west && !east && !south && !north){ direction = W;  }
			else if ( west && !east && !south &&  north){ direction = NW; }

			if (direction){
				SM.gEnemies[i].direction = direction;				
				_applyMomentum(SM.gEnemies[i], direction);	
			}			
			_applyMovement(SM.gEnemies[i]);
			_draw(SM.gEnemies[i]);
		}
	}
	return {
		init: init,
		makeMove: makeMove
	};
} () );

NPC.init();