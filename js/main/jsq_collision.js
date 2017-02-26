var Collision = ( function () {
	const MODULE_NAME = "Collision";
	const collisionBuffer = 3;

	var init = function(){
		console.log("Loading Module ".concat(MODULE_NAME));

	};	

	var checkForCollision = function(object){
		var i;
		var direction = Movement.determineMovingDirection(object);
		var colliableObjsWithDistanceKey = {}
		if (direction && SM.gCollidableObjs.length > 0){
			for (i = 0; i < SM.gCollidableObjs.length; i++){
				if (SM.gCollidableObjs[i] != object){				
					// Add all colliable objects except inObj & add to associative array, using absolute distance from inObj as key. 
					// Sort by distance & run collision algorithm. Break at first collision.
					var key = _determineObjectDistanceByPoints(object, SM.gCollidableObjs[i], direction);
					colliableObjsWithDistanceKey[key] = SM.gCollidableObjs[i];
				}
			}

			var keys = [];
			for (key in colliableObjsWithDistanceKey){
				if (colliableObjsWithDistanceKey.hasOwnProperty(key)){
					keys.push(key);
				}
			}

			keys.sort(function(a, b) {
			    return a - b
			})
		
			var objDistanceTravel = Math.sqrt( Math.pow(object.xMomentum, 2) + Math.pow( object.yMomentum, 2) );
			for (i = 0; i < keys.length; i++){
				// if (objDistanceTravel < keys[i]){ // uncomment for testing purposes
				// 	break;
				// }

				// check for collision on objects (sorted by distance)
				_checkCollisionInDirection(object, colliableObjsWithDistanceKey[keys[i]], direction);			
				objDistanceTravel = Math.abs(object.xMomentum) + Math.abs(object.yMomentum);
				if (objDistanceTravel == 0){
					break;
				}
				direction = Movement.determineMovingDirection(object); // update direction (can change from diagonal to vert/horizonal)
			}
		}
	}
	// TODO - refine the algorithm to get absolute accurate distance apart for any given axis (direction). 
	// First find where the closest x or y point is on the two objects. 
	var _determineObjectDistanceByPoints = function(selectObject, targetObject, direction){
		switch (direction){
			case SM.N: // check top face against bottom face
				var yTarget = targetObject.yPos + targetObject.height;
				var xTarget = targetObject.xPos + (targetObject.width/2);
				var ySelect = selectObject.yPos;
				var xSelect = selectObject.xPos + (selectObject.width/2);
				break;
			case SM.NE: // check top right cnr against bottom left cnr
				var yTarget = targetObject.yPos + targetObject.height;
				var xTarget = targetObject.xPos;
				var ySelect = selectObject.yPos;
				var xSelect = selectObject.xPos + selectObject.width;				
				break;
			case SM.E: // check right face against left face
				var yTarget = targetObject.yPos + (targetObject.height/2);
				var xTarget = targetObject.xPos;
				var ySelect = selectObject.yPos + (selectObject.height/2);
				var xSelect = selectObject.xPos + selectObject.width;				
				break;
			case SM.SE: // check bottom right cnr against top left cnr
				var yTarget = targetObject.yPos;
				var xTarget = targetObject.xPos;
				var ySelect = selectObject.yPos + selectObject.height;
				var xSelect = selectObject.xPos + selectObject.width;
				break;
			case SM.S: // check bottom against top 
				var yTarget = targetObject.yPos;
				var xTarget = targetObject.xPos + (targetObject.width/2);
				var ySelect = selectObject.yPos + selectObject.height;
				var xSelect = selectObject.xPos + (selectObject.width/2);
				break;
			case SM.SW: // check bottom left cnr against top right cnr
				var yTarget = targetObject.yPos;
				var xTarget = targetObject.xPos + targetObject.width;
				var ySelect = selectObject.yPos + selectObject.height;
				var xSelect = selectObject.xPos;
				break;
			case SM.W: // check right against left 
				var yTarget = targetObject.yPos + (targetObject.height/2);
				var xTarget = targetObject.xPos + targetObject.width;
				var ySelect = selectObject.yPos + (selectObject.height/2);
				var xSelect = selectObject.xPos;
				break;
			case SM.NW: // check top right cnr against bottom left cnr
				var yTarget = targetObject.yPos + targetObject.height;
				var xTarget = targetObject.xPos + targetObject.width;
				var ySelect = selectObject.yPos
				var xSelect = selectObject.xPos
				break;
		}
		return Math.sqrt( Math.pow((xTarget - xSelect), 2) + Math.pow((yTarget - ySelect), 2) );
	}
	var _checkCollisionInDirection = function(selectObj, targetObj, direction){
		var x, y, collision = false, foundPointOfCollision = false; yMaxMomentum = selectObj.yMomentum, xMaxMomentum = selectObj.xMomentum;
		switch (direction){
			case SM.N: // negative yMomentum
				// check top face	
				// Set momentum adjustifer here
				for (y = -1; y >= yMaxMomentum; y--){
					if (_collision(selectObj, targetObj, 0, y)){ 
						selectObj.yMomentum=y+collisionBuffer; 
						collision = true; 
						break; 
					}
				}	
				break;
			case SM.NE: // negative yMomentum, positive xMomentum
				// check top & right face
				for (x = 1, y = -1; x <= xMaxMomentum, y >= yMaxMomentum; x++, y--){
					if (_collision(selectObj, targetObj, x, y)){ 
						selectObj.xMomentum=x-collisionBuffer; 
						selectObj.yMomentum=y+collisionBuffer;
						collision = true;  
						break;
					}
				}	
				break;
			case SM.E: // positive xMomentum
				// check right face
				for (x = 1; x <= xMaxMomentum; x++){
					if (_collision(selectObj, targetObj, x, 0)){ 
						selectObj.xMomentum=x-collisionBuffer; 
						collision = true; 
						break; 
					}
				}	
				break;
			case SM.SE: // positive yMomentum, positive xMomentum
				// check bottom & right face
				for (x = 1, y = 1;  x <= xMaxMomentum, y <= yMaxMomentum; x++, y ++){
					if (_collision(selectObj, targetObj, x, y)){ 
						selectObj.xMomentum=x-collisionBuffer; 
						selectObj.yMomentum=y-collisionBuffer; 
						collision = true; 
						break;
					}				
				}	
				break;
			case SM.S: // positive yMomentum
				// check bottom face
				for (asay = 1; y <= yMaxMomentum; y++){
					if (_collision(selectObj, targetObj, 0, y)){
						selectObj.yMomentum=y-collisionBuffer;  
						collision = true;
						break; 						
					}
				}	
				break;
			case SM.SW: // positive yMomentum, negative xMomentum
				// check bottom & left face
				for (x = -1, y = 1;  x >= xMaxMomentum, y <= yMaxMomentum; x--, y++){
					if (_collision(selectObj, targetObj, x, y)){
						selectObj.xMomentum=x+collisionBuffer; 
						selectObj.yMomentum=y-collisionBuffer; 
						collision = true; 
						break; 
					}					
				}	
				break;
			case SM.W: // negative xMomentum
				// check left face
				for (x = -1; x >= xMaxMomentum; x --){
					if (_collision(selectObj, targetObj, x, 0)){
						selectObj.xMomentum=x+collisionBuffer;
						collision = true; 
						break; 
					}
				}	
				break;
			case SM.NW: // negative yMomentum, negative xMomentum
				// check top & left face
				for (x = -1, y = -1;  x >= xMaxMomentum, y >= yMaxMomentum;  x--, y--){
					if (_collision(selectObj, targetObj, x, y)){
						selectObj.xMomentum=x+collisionBuffer; 
						selectObj.yMomentum=y+collisionBuffer; 
						collision = true; 
						break; 
					}
				}	
				break;
		}
		return collision;
	}
	var _collision = function(selectObj, targetObj, xMomentum, yMomentum){
		var sTop   = selectObj.yPos + yMomentum;
		var sRight = selectObj.xPos + selectObj.width  + xMomentum;
		var sLeft  = selectObj.xPos + xMomentum;
		var sBott  = selectObj.yPos + selectObj.height + yMomentum;
		
		var tTop   = targetObj.yPos;
		var tRight = targetObj.xPos + targetObj.width;
		var tLeft  = targetObj.xPos;
		var tBott  = targetObj.yPos + targetObj.height;
		if ( sTop   < tBott  &&  
			 sRight > tLeft  && 
			 sLeft  < tRight && 
			 sBott  > tTop   ){ 
			return true;
		}
		return false;
	}

	return {
		init: init,
		checkForCollision: checkForCollision
	};
} () );

Collision.init();