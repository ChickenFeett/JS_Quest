var gTest = ( function () {
	const FRAME_TIME = 20; // the time (in milliseconds) that will occur between main loop execution
	const APP_NAME = " ~ JS Quest ~ ";
	const N="↑", NW="↖", W="←", SW="↙", S="↓", SE="↘", E="→", NE="↗"; // Setup constant direction fields
	const BUTTONS = { w: false, a: false, s: false,	d: false }; // setup button presses (true if pressed, false if not)	
	var gLoop; // the setInterval object stored here, this is the object that controls the main loop
	var gPreviousLoopComplete = true; // prevent main loop from executing until the previous loop has finished.
	var gPageWidth, gPageHeight; // screen width and height - will be used to create max height/width of play area
	var gPlayer = {}; // player object, made global for easy access
	var gEnemies = []; // array of all the enemies
	var gCollidableObjs = []; // array of all spawned objects 

	var init = function(){
		console.log("Loading ".concat(APP_NAME));
		var width  = $( window ).width();
		var height = $( window ).height();
		gPlayer =  _createNewObject("res/character/player.jpg", "player", 0, 0, 750, 100, 100, 100, 0, 2, 100, N);
		_spawn(gPlayer);
		gEnemies[gEnemies.length] = _createNewObject("res/enemy/enemy.gif", "enemy1", 0, 0, 500, 500, 100, 100, 0, 1, 75, N);	
		_spawn(gEnemies[gEnemies.length-1]);
		gEnemies[gEnemies.length] = _createNewObject("res/enemy/enemy.gif", "enemy2", 0, 0, 750, 1200, 100, 100, 0, 1, 75, N);		
		_spawn(gEnemies[gEnemies.length-1]);
	};
	
	var _createNewObject = function(imagePath, id, xMomentum, yMomentum, xPos, yPos, height, width, cycle, speed, range, direction){
		return {
			imageObj  : null,
			imagePath : imagePath,
			id        : id,
			xMomentum : yMomentum,
			yMomentum : xMomentum,
			xPos      : xPos,
			yPos      : yPos,
			height    : height,
			width     : width,
			cycle     : cycle,
			speed     : speed,
			range     : range,
			direction : N
		}; 
	}

	var _spawn = function(object){
		$('body').append("<img id='"+object.id+"' src='"+object.imagePath+"' height='"+object.height+"' width='"+object.width+"'>");
		object.imageObj = document.getElementById(object.id);
        object.imageObj.style.position= 'absolute'; 
     	object.imageObj.style.left  = object.xPos + 'px'; 
     	object.imageObj.style.right = object.yPos + 'px'; 
     	gCollidableObjs[gCollidableObjs.length] = object; // add newly spawned object to collidable 
	}
	var startLoop = function(){
		console.log("Preparing main loop");		
		_loadEventHandlers();
		console.log(gCollidableObjs);
		gLoop = setInterval(_main, FRAME_TIME);
	};

	var _main = function(){

		if (gPreviousLoopComplete){ // Main loop begins here
			gPreviousLoopComplete = false;

			var direction = _determineFaceDirection();

			//_collision();

			if (direction){
				gPlayer.direction = direction;
				_applyMomentum(gPlayer, direction);	
			}
			_applyMomentumNPCs();
			_applyMovement(gPlayer);
			_draw(gPlayer);	

			gPreviousLoopComplete = true;
		}		
	};

	var _applyMomentumNPCs = function(){
		var i;
		for (i = 0; i < gEnemies.length; i++){
			var north = false, east = false, south = false, west = false, direction = false;
			if      (gPlayer.xPos + (gPlayer.width/2)  < gEnemies[i].xPos + (gEnemies[i].width/2)  - gEnemies[i].range){ // check if enemy in range in positive x direction
				west = true;
			}
			else if (gPlayer.xPos + (gPlayer.width/2)  > gEnemies[i].xPos + (gEnemies[i].width/2)  + gEnemies[i].range){ // check if enemy in range in negative x direction
				east = true;
			}
			if      (gPlayer.yPos + (gPlayer.height/2) < gEnemies[i].yPos + (gEnemies[i].height/2) - gEnemies[i].range){ // check if enemy in range in positive y direction
				north = true;
			}
			else if (gPlayer.yPos + (gPlayer.height/2) > gEnemies[i].yPos + (gEnemies[i].height/2) + gEnemies[i].range){ // check if enemy in range in negative y direction
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
				gEnemies[i].direction = direction;				
				_applyMomentum(gEnemies[i], direction);	
			}			
			_applyMovement(gEnemies[i]);
			_draw(gEnemies[i]);
		}
	}

	var _collision = function(object){
		var i;
		var direction = _determineMovingDirection(object);
		var colliableObjsWithDistanceKey = {}
		for (i = 0; i < gCollidableObjs.length; i++){
			if (gCollidableObjs[i] != object){				
				// Add all colliable objects except inObj & add to associative array, using absolute distance from inObj as key. Sort by distance & run collision algorithm. Break at first collision.
				var key = _determineObjectDistanceByPoints(object, gCollidableObjs[i], direction);
				colliableObjsWithDistanceKey[key] = gCollidableObjs[i];
			}
		}
		var keys = [];
		for (key in colliableObjsWithDistanceKey){
			if (colliableObjsWithDistanceKey.hasOwnProperty(key)){
				keys.push(key);
			}
		}

		keys.sort();

		for (i = 0; i < keys.length; i++){
			_checkCollisionInDirection(object, colliableObjsWithDistanceKey[key[i]], direction);			
		}
	}

	var _determineObjectDistanceByPoints = function(selectObject, targetObject, direction){
		switch (direction){
			case N: // check top face against bottom face
				var yTarget = targetObject.yPox + targetObject.height;
				var xTarget = targetObject.xPos + (targetObject.width/2);
				var ySelect = selectObject.yPox;
				var xSelect = selectObject.xPos + (selectObject.width/2);
				break;
			case NE: // check top right cnr against bottom left cnr
				var yTarget = targetObject.yPox + targetObject.height;
				var xTarget = targetObject.xPos;
				var ySelect = selectObject.yPox;
				var xSelect = selectObject.xPos + selectObject.width;				
				break;
			case E: // check right face against left face
				var yTarget = targetObject.yPox + (targetObject.height/2);
				var xTarget = targetObject.xPos;
				var ySelect = selectObject.yPox + (selectObject.height/2);
				var xSelect = selectObject.xPos + selectObject.width;				
				break;
			case SE: // check bottom right cnr against top left cnr
				var yTarget = targetObject.yPox;
				var xTarget = targetObject.xPos;
				var ySelect = selectObject.yPox + selectObject.height;
				var xSelect = selectObject.xPos + selectObject.width;
				break;
			case S: // check bottom against top 
				var yTarget = targetObject.yPox;
				var xTarget = targetObject.xPos + (targetObject.width/2);
				var ySelect = selectObject.yPox + selectObject.height;
				var xSelect = selectObject.xPos + (selectObject.width/2);
				break;
			case SW: // check bottom left cnr against top right cnr
				var yTarget = targetObject.yPox;
				var xTarget = targetObject.xPos + targetObject.width;
				var ySelect = selectObject.yPox + selectObject.height;
				var xSelect = selectObject.xPos;
				break;
			case W: // check right against left 
				var yTarget = targetObject.yPox + (targetObject.height/2);
				var xTarget = targetObject.xPos + targetObject.width;
				var ySelect = selectObject.yPox + (selectObject.height/2);
				var xSelect = selectObject.xPos;
				break;
			case NW: // check top right cnr against bottom left cnr
				var yTarget = targetObject.yPox + targetObject.height;
				var xTarget = targetObject.xPos + targetObject.width;
				var ySelect = selectObject.yPox
				var xSelect = selectObject.xPos
				break;
			return Math.sqrt( Math.pow((xTarget - xSelected), 2) + Math.pow((yTarget - ySelected), 2) );
		}
	}
	var _checkCollisionInDirection = function(selectObj, targetObj, direction){
		// TBC ~~~~~ !!! 
		switch (direction){
			case N:
				// check top face				
				break;
			case NE:
				// check top & right face
				break;
			case E:
				// check right face
				break;
			case SE:
				// check bottom & right face
				break;
			case S:
				// check bottom face
				break;
			case SW:
				// check bottom & left face
				break;
			case W:
				// check left face
				break;
			case NW:
				// check top & left face
				break;
		}
		
	}

	// Add momentum, which will lead to movement. 
	var _applyMomentum = function(object, direction) {
		if (object.yMomentum < 10 && object.yMomentum > -10){
			switch (direction){
				case N : object.yMomentum-=object.speed; break;
				case NE: object.yMomentum-=object.speed; break;
				case SE: object.yMomentum+=object.speed; break;
				case S : object.yMomentum+=object.speed; break;
				case SW: object.yMomentum+=object.speed; break;
				case NW: object.yMomentum-=object.speed; break;
			}
		}
		if (object.xMomentum < 10 && object.xMomentum > -10 ){
			switch (direction){
				case NE: object.xMomentum+=object.speed; break;
				case E : object.xMomentum+=object.speed; break;
				case SE: object.xMomentum+=object.speed; break;
				case SW: object.xMomentum-=object.speed; break;
				case W : object.xMomentum-=object.speed; break;
				case NW: object.xMomentum-=object.speed; break;
			}
		}
	}

	/* Based on momentum, add force (movement). Force is exchanged for momentum
		Just before we move an object; check whether movement is possible (check for collision)
		if collision will occur, how much can the moving body move, if at all.
	*/
	var _applyMovement = function(object){
		_collision(object); // check for collision before applying movement
		object.xPos += object.xMomentum;
		object.yPos += object.yMomentum;
		if (object.xMomentum < 0) { object.xMomentum ++ ; }
		if (object.xMomentum > 0) { object.xMomentum -- ; }

		if (object.yMomentum < 0) { object.yMomentum ++ ; }
		if (object.yMomentum > 0) { object.yMomentum -- ; }
	}

	var _draw = function(object){		
		object.imageObj.style.left = object.xPos + 'px'; 
     	object.imageObj.style.top  = object.yPos + 'px'; 
	}

	var _determineMovingDirection = function(object){
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
		if      (!west && !east && !south &&  north){ direction = N;  }
		else if (!west &&  east && !south &&  north){ direction = NE; }
		else if (!west &&  east && !south && !north){ direction = E;  }
		else if (!west &&  east &&  south && !north){ direction = SE; }
		else if (!west && !east &&  south && !north){ direction = S;  }
		else if ( west && !east &&  south && !north){ direction = SW; }
		else if ( west && !east && !south && !north){ direction = W;  }
		else if ( west && !east && !south &&  north){ direction = NW; }
		return direction;
	}

	var _determineFaceDirection = function(){
		var direction = false;
		if      ((BUTTONS.w && !BUTTONS.a && !BUTTONS.s && !BUTTONS.d) || 
			     (BUTTONS.w &&  BUTTONS.a && !BUTTONS.s &&  BUTTONS.d)){ direction = N; }
		else if ( BUTTONS.w &&  BUTTONS.a && !BUTTONS.s && !BUTTONS.d) { direction = NW; }
		else if (!BUTTONS.w &&  BUTTONS.a && !BUTTONS.s && !BUTTONS.d) { direction = W; }
		else if (!BUTTONS.w &&  BUTTONS.a &&  BUTTONS.s && !BUTTONS.d) { direction = SW; }
		else if((!BUTTONS.w && !BUTTONS.a &&  BUTTONS.s && !BUTTONS.d) ||
			    (!BUTTONS.w &&  BUTTONS.a &&  BUTTONS.s &&  BUTTONS.d)){ direction = S; }
		else if (!BUTTONS.w && !BUTTONS.a &&  BUTTONS.s &&  BUTTONS.d) { direction = SE; }
		else if (!BUTTONS.w && !BUTTONS.a && !BUTTONS.s &&  BUTTONS.d) { direction = E; }
		else if ( BUTTONS.w && !BUTTONS.a && !BUTTONS.s &&  BUTTONS.d) { direction = NE; }
		return direction;
	};

	// Handle button presses
	var _loadEventHandlers = function(){
		$("body").keydown(function(event) {
			switch(event.key){
				case 'w': BUTTONS.w = true;	break;
				case 'a': BUTTONS.a = true;	break;
				case 's': BUTTONS.s = true;	break;
				case 'd': BUTTONS.d = true;	break;
				case ' ': gPlayer.xPos = 0; gPlayer.yPos = 0; // reset player pos
			}
		});

		$("body").keyup(function(event) {
  		  	switch(event.key){
				case 'w': BUTTONS.w = false; break;
				case 'a': BUTTONS.a = false; break;
				case 's': BUTTONS.s = false; break;
				case 'd': BUTTONS.d = false; break;
			}
		});		
	};
	return {
		init: init,
		startLoop: startLoop
	};
} () );

gTest.init();
gTest.startLoop();