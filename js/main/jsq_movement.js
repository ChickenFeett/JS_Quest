var Movement = ( function () {
	const MODULE_NAME = "Movement";

	var init = function(){
		console.log("Loading Module ".concat(MODULE_NAME));

	};

	// Add momentum, which will lead to movement. 
	var applyMomentum = function(object, direction) {
		if (object.yMomentum < 10 && object.yMomentum > -10){
			switch (direction){
				case SM.N : object.yMomentum-=object.speed; break;
				case SM.NE: object.yMomentum-=object.speed; break;
				case SM.SE: object.yMomentum+=object.speed; break;
				case SM.S : object.yMomentum+=object.speed; break;
				case SM.SW: object.yMomentum+=object.speed; break;
				case SM.NW: object.yMomentum-=object.speed; break;
			}
		}
		if (object.xMomentum < 10 && object.xMomentum > -10 ){
			switch (direction){
				case SM.NE: object.xMomentum+=object.speed; break;
				case SM.E : object.xMomentum+=object.speed; break;
				case SM.SE: object.xMomentum+=object.speed; break;
				case SM.SW: object.xMomentum-=object.speed; break;
				case SM.W : object.xMomentum-=object.speed; break;
				case SM.NW: object.xMomentum-=object.speed; break;
			}
		}
	}

	/* Based on momentum, add force (movement). Force is exchanged for momentum
		Just before we move an object; check whether movement is possible (check for collision)
		if collision will occur, how much can the moving body move, if at all.
	*/
	var applyMovement = function(object){
		Collision.checkForCollision(object); // check for collision before applying movement
		object.xPos += parseInt(object.xMomentum/4);
		object.yPos += parseInt(object.yMomentum/4);
		if (object.xMomentum < 0) { object.xMomentum ++ ; }
		if (object.xMomentum > 0) { object.xMomentum -- ; }

		if (object.yMomentum < 0) { object.yMomentum ++ ; }
		if (object.yMomentum > 0) { object.yMomentum -- ; }
	}

	var determineMovingDirection = function(object){
		north = false, east = false, south = false, west = false;
		if      (object.xMomentum > 0){	east  = true; }
		else if (object.xMomentum < 0){	west  = true; }
		if      (object.yMomentum > 0){	south = true; }
		else if (object.yMomentum < 0){	north = true; }
		var direction = _determineDirectionGivenNESW(north, east, south, west);
		return direction;
	}

	var _determineDirectionGivenNESW = function (north, east, south, west){
		var direction = false;
		if      (!west && !east && !south &&  north){ direction = SM.N;  }
		else if (!west &&  east && !south &&  north){ direction = SM.NE; }
		else if (!west &&  east && !south && !north){ direction = SM.E;  }
		else if (!west &&  east &&  south && !north){ direction = SM.SE; }
		else if (!west && !east &&  south && !north){ direction = SM.S;  }
		else if ( west && !east &&  south && !north){ direction = SM.SW; }
		else if ( west && !east && !south && !north){ direction = SM.W;  }
		else if ( west && !east && !south &&  north){ direction = SM.NW; }
		return direction;
	}

	return {
		init: init,
		applyMomentum: applyMomentum,
		applyMovement: applyMovement,
		determineMovingDirection: determineMovingDirection
	};
} () );

Movement.init();