console.log("Testing Initiated!")

// Test player spawned
QUnit.test( "Player Spawning", function( assert ) {
  assert.ok( gPlayer != undefined, "Passed!" );
});

// Test spawning walls
var i;
for (i = 0; i < gCollidableObjs; i++){
	QUnit.test( "Wall Spawning", function( assert ) {
	  assert.ok( gCollidableObjs[i] != undefined, "Passed!" );
});
}

// Test spawning enemies
for (i = 0; i < gEnemies; i++){
	QUnit.test( "Enemy Spawning", function( assert ) {
	  assert.ok( gEnemies[i] != undefined, "Passed!" );
});
}

// Test collision
QUnit.test( "Collision", function( assert ) {
  assert.ok( gPlayer != undefined, "Passed!" );
});
