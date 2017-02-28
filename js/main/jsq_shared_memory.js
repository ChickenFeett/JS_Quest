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
		HEIGHT: 20,
		WIDTH : 20
	},

	ID_NAME : {
		WALL  : "wall",
		GRASS : "grass"
	},
	PATH : {
		WALL  : "res/img/wall/wall.png",
		GRASS_FEATURE1 : "res/img/floor/grass_feature1.png",
		GRASS_FEATURE2 : "res/img/floor/grass_feature2.png",
		GRASS_FEATURE3 : "res/img/floor/grass_feature3.png",
		GRASS_FEATURE4 : "res/img/floor/grass_feature4.png",
		GRASS_PLAIN1 : "res/img/floor/grass_plain1.png",
		GRASS_PLAIN2 : "res/img/floor/grass_plain2.png"
	},
	MAP_OBJ : { 
		WALL   : 'w',
		GRASS  : 'g'
	},
	MAP_DATA : {
		1: "res/data/map/data1"
	}
};


console.log("Loading Module " + MODULE_NAME);