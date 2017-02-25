var NPC = ( function () {
	const MODULE_NAME = "NPC Logic";
	
	var init = function(){
		console.log("Loading Module ".concat(MODULE_NAME));
	};
	
	var makeMove = function(){
		var i;
		for (i = 0; i < SM.gEnemies.length; i++){
			var north = false, east = false, south = false, west = false, direction = false;
			if      (SM.gPlayer.xPos + (SM.gPlayer.width/2)  < SM.gEnemies[i].xPos + (SM.gEnemies[i].width/2)  - SM.gEnemies[i].range){ // check if enemy in range in positive x direction
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

			if      (!west && !east && !south &&  north){ direction = SM.N;  }
			else if (!west &&  east && !south &&  north){ direction = SM.NE; }
			else if (!west &&  east && !south && !north){ direction = SM.E;  }
			else if (!west &&  east &&  south && !north){ direction = SM.SE; }
			else if (!west && !east &&  south && !north){ direction = SM.S;  }
			else if ( west && !east &&  south && !north){ direction = SM.SW; }
			else if ( west && !east && !south && !north){ direction = SM.W;  }
			else if ( west && !east && !south &&  north){ direction = SM.NW; }

			if (direction){
				SM.gEnemies[i].direction = direction;				
				Movement.applyMomentum(SM.gEnemies[i], direction);	
			}			
			Movement.applyMovement(SM.gEnemies[i]);
			ObjMgmt.draw(SM.gEnemies[i]);
		}
	}
	return {
		init: init,
		makeMove: makeMove
	};
} () );

NPC.init();