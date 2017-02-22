var ObjectMgmt = ( function () {
	const MODULE_NAME = "Object Management";	

	var init = function(){
		console.log("Loading Module ".concat(MODULE_NAME));
	}

	var createNewObject = function(imagePath, id, xMomentum, yMomentum, xPos, yPos, height, width, cycle, speed, range, direction){
		var increment = 1;
		while ($('#'+id).length){ // create unique ID if ID already in use
			id = id + increment;
			increment++;
		}
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
			direction : direction
		}; 
	}

	var spawn = function(object){
		SM.pa_container.append("<img id='"+object.id+"' src='"+object.imagePath+"' height='"+object.height+"' width='"+object.width+"'>");
		object.imageObj = document.getElementById(object.id);
        object.imageObj.style.position= 'absolute'; 
     	object.imageObj.style.left  = object.xPos + 'px'; 
     	object.imageObj.style.right = object.yPos + 'px'; 
     	SM.gCollidableObjs[SM.gCollidableObjs.length] = object; // add newly spawned object to collidable 
     	Html.draw(object);
	}

	return {
		init: init,
		createNewObject: createNewObject,
		spawn: spawn
	};
} () );

ObjectMgmt.init();
