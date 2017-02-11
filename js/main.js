var gTest = (function (){
	const FRAME_TIME = 20; // the time (in milliseconds) that will occur between main loop execution
	const APP_NAME = "Test";
	const N="↑", NW="↖", W="←", SW="↙", S="↓", SE="↘", E="→", NE="↗"; // Setup constant direction fields
	const BUTTONS = { w: false, a: false, s: false,	d: false }; // setup button presses (true if pressed, false if not)	
	var gLoop; // the setInterval object stored here, this is the object that controls the main loop
	var gPreviousLoopComplete = true; // prevent main loop from executing until the previous loop has finished.
	var gPageWidth, gPageHeight; // screen width and height - will be used to create max height/width of play area

	var gPlayer = {
		imageObj: null,
		imagePath: "res/character/player.jpg",
		id: "imgPlayer",
		xMomentum: 0,
		yMomentum: 0,
		xPos: 0,
		yPos: 0,
		height: 100,
		width: 100,
		cycle: 0,
		direction: N
	};

	var gEnemies = [];

	var gPlayerCollidable = {};
	var gNPCCollidable = {};

	var init = function(){
		console.log("Loading ".concat(APP_NAME));
		var width  = $( window ).width();
		var height = $( window ).height();
		_addImageToBody(gPlayer);
		_addImageToBody(_createNewEnemy("res/enemy/enemy.gif", "enemy1"));
	};
	
	var _createNewEnemy = function(imagePath, id){
		gEnemies[gEnemies.length] = {
			imageObj: null,
			imagePath: imagePath,
			id: id,
			xMomentum: 0,
			yMomentum: 0,
			xPos: 0,
			yPos: 0,
			height: 100,
			width: 100,
			cycle: 0,
			direction: N
		};
		return gEnemies[gEnemies.length-1];
	}

	var _addImageToBody = function(object){
		$('body').append("<img id='"+object.id+"' src='"+object.imagePath+"'>");
		object.imageObj = document.getElementById(object.id);
        object.imageObj.style.position= 'absolute'; 
     	object.imageObj.style.left  = object.xPos + 'px'; 
     	object.imageObj.style.right = object.yPos + 'px'; 
	}
	var startLoop = function(){
		console.log("Preparing main loop");		
		_loadEventHandlers();
		
		gLoop = setInterval(_main, FRAME_TIME);
	};

	var _main = function(){
		if (gPreviousLoopComplete){ // Main loop begins here
			gPreviousLoopComplete = false;

			var dir = _determineDirection();

			_collision();

			if (dir){
				_move(gPlayer, dir);	
			}
			_moveNPCs();
			_applyForce(gPlayer);
			_draw(gPlayer);	

			gPreviousLoopComplete = true;
		}		
	};

	var _moveNPCs = function(){
		var i, north = false, east = false, south = false, west = false, dir;
		for (i = 0; i < gEnemies.length; i++){
			if (gPlayer.xPos < gEnemies[i].xPos){
				west = true;
			}
			else {
				east = true;
			}
			if (gPlayer.yPos < gEnemies[i].yPos){
				north = true;
			}
			else{
				south = true
			}
			if (!west && !east && !south &&  north){ dir = N;  }
			if (!west &&  east && !south &&  north){ dir = NE; }
			if (!west &&  east && !south && !north){ dir = E;  }
			if (!west &&  east &&  south && !north){ dir = SE; }
			if (!west && !east &&  south && !north){ dir = S;  }
			if ( west && !east &&  south && !north){ dir = SW; }
			if ( west && !east && !south && !north){ dir = W;  }
			if ( west && !east && !south &&  north){ dir = NW; }
			_move(gEnemies[i], dir)
		}
	}

	var _collision = function(){
		var i;
		for (i = 0; i < gPlayerCollidable.length; i++){
			if (  (gPlayer.x + gPlayer.width) > (gPlayerCollidable[i].x) &&                               //      p right > o left 
				 (gPlayer.y + gPlayer.height) > (gPlayerCollidable[i].y) &&                               //     p bottom > o top
				                  (gPlayer.y) < (gPlayerCollidable[i].y + gPlayerCollidable[i].height) && //        p top < o bottom
				                  (gPlayer.x) < (gPlayerCollidable[i].x + gPlayerCollidable[i].width) ) { //       p left < o right
				// handle collision
				// if delicate (delicate destroyed, player react)
				// if hard     (player can't move that direction) (store in gPlayer.collided ? Look at this before move)

			}
		}
	}

	var _move = function(character, direction){
		if (character.yMomentum < 10 && character.yMomentum > -10){
			console.log(direction);		
			switch (direction){
				case N : character.yMomentum-=2; break;
				case NE: character.yMomentum-=2; break;
				case SE: character.yMomentum+=2; break;
				case S : character.yMomentum+=2; break;
				case SW: character.yMomentum+=2; break;
				case NW: character.yMomentum-=2; break;
			}
		}
		if (character.xMomentum < 10 && character.xMomentum > -10 ){
			console.log(direction);		
			switch (direction){
				case NE: character.xMomentum+=2; break;
				case E : character.xMomentum+=2; break;
				case SE: character.xMomentum+=2; break;
				case SW: character.xMomentum-=2; break;
				case W : character.xMomentum-=2; break;
				case NW: character.xMomentum-=2; break;
			}
		}
	}

	var _applyForce = function(character){
		character.xPos += character.xMomentum;
		character.yPos += character.yMomentum;
		if (character.xMomentum < 0) { character.xMomentum ++  ; }
		if (character.xMomentum > 0) { character.xMomentum -- ; }

		if (character.yMomentum < 0) { character.yMomentum ++ ; }
		if (character.yMomentum > 0) { character.yMomentum -- ; }
	}

	var _draw = function(object){
		//$("#mainCanvas").getContext("2d").drawImage("res/character/player.jpg", gPlayer.x, gPlayer.y);

	    //ctx.drawImage(image, gPlayer.x, gPlayer.y);
		gPlayer.imageObj.style.left = gPlayer.xPos + 'px'; 
     	gPlayer.imageObj.style.top  = gPlayer.yPos + 'px'; 

	}

	var _determineDirection = function(){
		var dir = false;
		if      ((BUTTONS.w && !BUTTONS.a && !BUTTONS.s && !BUTTONS.d) || 
			     (BUTTONS.w &&  BUTTONS.a && !BUTTONS.s &&  BUTTONS.d)){ dir = N; }
		else if ( BUTTONS.w &&  BUTTONS.a && !BUTTONS.s && !BUTTONS.d) { dir = NW; }
		else if (!BUTTONS.w &&  BUTTONS.a && !BUTTONS.s && !BUTTONS.d) { dir = W; }
		else if (!BUTTONS.w &&  BUTTONS.a &&  BUTTONS.s && !BUTTONS.d) { dir = SW; }
		else if((!BUTTONS.w && !BUTTONS.a &&  BUTTONS.s && !BUTTONS.d) ||
			    (!BUTTONS.w &&  BUTTONS.a &&  BUTTONS.s &&  BUTTONS.d)){ dir = S; }
		else if (!BUTTONS.w && !BUTTONS.a &&  BUTTONS.s &&  BUTTONS.d) { dir = SE; }
		else if (!BUTTONS.w && !BUTTONS.a && !BUTTONS.s &&  BUTTONS.d) { dir = E; }
		else if ( BUTTONS.w && !BUTTONS.a && !BUTTONS.s &&  BUTTONS.d) { dir = NE; }
		return dir;
	};

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
}());

gTest.init();
gTest.startLoop();