var fixPosition = function() {
  camera.position.set(11, 11, 11);
  camera.lookAt(scene.position);
};

fix_position.addEventListener('click', function() {
  fixPosition();
});
