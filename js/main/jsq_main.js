var JSQ_Main = ( function () {
	const FRAME_TIME = 20; // the time (in milliseconds) that will occur between main loop execution
	var gLoop; // the setInterval object stored here, this is the object that controls the main loop
	var gPreviousLoopComplete = true; // prevent main loop from executing until the previous loop has finished.

	var init = function(){
		console.log("Loading ".concat(SM.APP_NAME));
		_loadEventHandlers();
	};

	var startLoop = function(){
		console.log("Preparing main loop");	
		console.log(SM);
		
		GenMap.loadMap(SM.MAP_DATA['1']);

		gPlayer =  ObjMgmt.createNewObject("res/img/character/player.png", "player", 0, 0, SM.pa_x_pos + (SM.pa_width/2), SM.pa_y_pos + (SM.pa_height/2), 18, 22, 0, 2, 30, SM.N, 100);
		SM.gEnemies[SM.gEnemies.length] = ObjMgmt.createNewObject("res/img/enemy/enemy.gif", "enemy", 0, 0, SM.pa_x_pos + 10 , SM.pa_y_pos + 10 , 18, 22, 0, 2, 30, SM.N, 100);

		gLoop = setInterval(_mainLoop, FRAME_TIME);
	};

	var _mainLoop = function(){
		 // ================================ M A I N   L O O P ========================================
		if (gPreviousLoopComplete){
			gPreviousLoopComplete = false;

			var direction = PlayerMovement.determineMovementDirection();

			//_collision();

			if (direction){
				gPlayer.direction = direction;
				Movement.applyMomentum(gPlayer, direction);	
			}
			NPC.makeMove();
			Movement.applyMovement(gPlayer);
			ObjMgmt.draw(gPlayer);	

			gPreviousLoopComplete = true;
		}		
		// ================================        E N D        ========================================
	};


	// Handle button presses
	var _loadEventHandlers = function(){
		$("body").keydown(function(event) {
			switch(event.key){
				case 'w': SM.BUTTONS.w = true;	break;
				case 'a': SM.BUTTONS.a = true;	break;
				case 's': SM.BUTTONS.s = true;	break;
				case 'd': SM.BUTTONS.d = true;	break;
				case ' ': SM.gPlayer.xPos = 0; SM.gPlayer.yPos = 0; // reset player pos
			}
		});

		$("body").keyup(function(event) {
  		  	switch(event.key){
				case 'w': SM.BUTTONS.w = false; break;
				case 'a': SM.BUTTONS.a = false; break;
				case 's': SM.BUTTONS.s = false; break;
				case 'd': SM.BUTTONS.d = false; break;
			}
		});	

		$("#btnToggleLights").click(function(event){
			Html.toggleLights();
		});
	};
	return {
		init: init,
		startLoop: startLoop
	};
} () );

JSQ_Main.init();
JSQ_Main.startLoop();
