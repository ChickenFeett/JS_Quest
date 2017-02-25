/* SM short for shared memory.
 
 As we will be accessing this section of code fairly
 frequently among classes it will improve readability
 to shorten the class name to SM
 
 This class will hold any piece of memory 
 that is shared among two or more classes.
*/
const MODULE_NAME = "Shared Memory";

/* SM Rules: 
    Objects with capital names (THIS_IS_AN_EXAMPLE)
	must be treated as final constants. Other object
	names must start with a lowercase g (gThisIsAnExample) 
	and must be treated as variables.
*/
const SM = {
	APP_NAME: " ~ JS Quest ~ ",
    N:"↑", NW:"↖", W:"←", SW:"↙", S:"↓", SE:"↘", E:"→", NE:"↗", // Setup constant direction fields
    BUTTONS : { w: false, a: false, s: false,	d: false }, // setup button presses (true if pressed, false if not)	
	gPlayer : {}, // player object, made global for easy access
	gEnemies : [], // array of all the enemies
	gCollidableObjs : [], // array of all spawned objects 
	pa_container: null,
	pa_x_pos: null, //playable area x
	pa_y_pos: null, //playable area y
	pa_width: null, //playable area width
	pa_height: null, //playable area height
	lights: true,
	DEFAULT: {
		HEIGHT: 100,
		WIDTH : 100
	},

	ID_NAME : {
		WALL  : "wall",
		GRASS : "grass"
	},
	PATH : {
		WALL  : "img/walls/wall.png",
		GRASS : "img/floors/grass.png"
	},
	MAP_OBJ : { 
		WALL   : 'w',
		GRASS  : 'g'
	},
	MAP_DATA : {
		1: "res/map_data/data1"
	}
};


console.log("Loading Module " + MODULE_NAME);