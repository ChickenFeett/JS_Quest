console.log("Testing Initiated!")

// Test all modules loaded
QUnit.test( "Modules loaded", function( assert ) {
  assert.ok( SM             != undefined, "Shared Memory" );
  assert.ok( Collision      != undefined, "Collision" );
  assert.ok( GenMap         != undefined, "Generate Map" );
  assert.ok( Html           != undefined, "HTML Manager" );
  assert.ok( JSQ_Main       != undefined, "JS Quest Main" );
  assert.ok( Movement       != undefined, "Movement" );
  assert.ok( NPC            != undefined, "NPC Logic" );
  assert.ok( ObjMgmt        != undefined, "Object Management" );
  assert.ok( PlayerMovement != undefined, "Player Movement" );
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
