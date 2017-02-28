var ObjMgmt = ( function () {
	const MODULE_NAME = "Object Management";	

	var init = function(){
		console.log("Loading Module ".concat(MODULE_NAME));
	}

	var createNewObject = function(imagePath, id, xMomentum, yMomentum, xPos, yPos, width, height, cycle, speed, range, direction, collidable){
		var increment = 1;
		while ($('#'+(id+increment)).length){ // create unique ID if ID already in use			
			increment++;
		}
		id = id + increment;
		obj = {
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
			direction : direction,
			collidable: collidable
		};
		_spawn(obj);
		return obj;
	}

	var draw = function(object){
		object.imageObj.style.left = object.xPos + 'px';
     	object.imageObj.style.top  = object.yPos + 'px';
	}

	var _spawn = function(object){
		SM.pa_container.append("<div id='"+object.id+"' style='width:"+object.width+"px; height:"+object.height+"px;'>");
		object.imageObj = document.getElementById(object.id);
        object.imageObj.style.position= 'absolute';
     	object.imageObj.style.left  = object.xPos + 'px';
     	object.imageObj.style.right = object.yPos + 'px';
     	object.imageObj.style.backgroundImage = "url('"+object.imagePath+"')";
     	object.imageObj.style.position = "3px 107px";
     	if (object.collidable){
	     	SM.gCollidableObjs[SM.gCollidableObjs.length] = object; // add newly spawned object to collidable 
	    }
     	draw(object);
	}

	return {
		init: init,
		createNewObject: createNewObject,
		draw: draw
	};
} () );

ObjMgmt.init();
