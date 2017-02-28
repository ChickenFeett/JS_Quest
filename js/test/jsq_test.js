console.log("Testing Initiated!")

// Test all modules loaded
QUnit.test( "Modules loaded", function( assert ) {
  assert.ok( SM             != undefined, "Passed!" );
  assert.ok( Collision      != undefined, "Passed!" );
  assert.ok( GenMap         != undefined, "Passed!" );
  assert.ok( Html           != undefined, "Passed!" );
  assert.ok( JSQ_Main       != undefined, "Passed!" );
  assert.ok( Movement       != undefined, "Passed!" );
  assert.ok( NPC            != undefined, "Passed!" );
  assert.ok( ObjMgmt        != undefined, "Passed!" );
  assert.ok( PlayerMovement != undefined, "Passed!" );
});


// Test player spawned
QUnit.test( "Player Spawning", function( assert ) {
  assert.ok( SM.gPlayer != undefined, "Passed!" );
});

// Test spawning walls
// var i;
// for (i = 0; i < gCollidableObjs; i++){
// 	QUnit.test( "Wall Spawning", function( assert ) {
// 	  assert.ok( gCollidableObjs[i] != undefined, "Passed!" );
// 	});
// }

// Test spawning enemies
// for (i = 0; i < gEnemies; i++){
// 	QUnit.test( "Enemy Spawning", function( assert ) {
// 	  assert.ok( gEnemies[i] != undefined, "Passed!" );
// });
// }

// Test collision
// QUnit.test( "Collision", function( assert ) {
//   assert.ok( gPlayer != undefined, "Passed!" );
// });
