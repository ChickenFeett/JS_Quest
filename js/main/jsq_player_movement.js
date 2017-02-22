var PlayerMovement = ( function () {
	const MODULE_NAME = "Player Movement";

	var init = function(){
		console.log("Loading Module ".concat(MODULE_NAME));

	};
	

	var determineMovementDirection = function(){
		var direction = false;
		if      ((SM.BUTTONS.w && !SM.BUTTONS.a && !SM.BUTTONS.s && !SM.BUTTONS.d) || 
			     (SM.BUTTONS.w &&  SM.BUTTONS.a && !SM.BUTTONS.s &&  SM.BUTTONS.d)){ direction = SM.N; }
		else if ( SM.BUTTONS.w &&  SM.BUTTONS.a && !SM.BUTTONS.s && !SM.BUTTONS.d) { direction = SM.NW; }
		else if (!SM.BUTTONS.w &&  SM.BUTTONS.a && !SM.BUTTONS.s && !SM.BUTTONS.d) { direction = SM.W; }
		else if (!SM.BUTTONS.w &&  SM.BUTTONS.a &&  SM.BUTTONS.s && !SM.BUTTONS.d) { direction = SM.SW; }
		else if((!SM.BUTTONS.w && !SM.BUTTONS.a &&  SM.BUTTONS.s && !SM.BUTTONS.d) ||
			    (!SM.BUTTONS.w &&  SM.BUTTONS.a &&  SM.BUTTONS.s &&  SM.BUTTONS.d)){ direction = SM.S; }
		else if (!SM.BUTTONS.w && !SM.BUTTONS.a &&  SM.BUTTONS.s &&  SM.BUTTONS.d) { direction = SM.SE; }
		else if (!SM.BUTTONS.w && !SM.BUTTONS.a && !SM.BUTTONS.s &&  SM.BUTTONS.d) { direction = SM.E; }
		else if ( SM.BUTTONS.w && !SM.BUTTONS.a && !SM.BUTTONS.s &&  SM.BUTTONS.d) { direction = SM.NE; }
		return direction;
	};

	return {
		init: init,
		determineMovementDirection: determineMovementDirection
	};
} () );

PlayerMovement.init();