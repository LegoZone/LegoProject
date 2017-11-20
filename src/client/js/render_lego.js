if ( ! Detector.webgl ) Detector.addGetWebGLMessage()

	var container, stats,
camera, scene, renderer,
controls, next_brick = 0, finished = false
bricksArray=[]

var next = document.querySelector('#next')
var previous = document.querySelector('#previous')
var fix_position = document.querySelector('#fix_position')
var container = document.querySelector('#container')
var monkey = document.querySelector('#monkey')
var reset = document.querySelector('#reset')

var __nextBrickLoaded = function () {
	return bricksArray[next_brick]
}

var __incrementNextBrick = function () {
	next_brick++
}

var __decrementNextBrick = function () {
	next_brick--
}
var __addBrickToScene = function() {
	scene.add(bricksArray[next_brick])
	__incrementNextBrick()
}

var __handleNextClick = function () {
	if(__nextBrickLoaded()) {
		__addBrickToScene()
	}
	else if(finished){
		return
	}
	else {
		handle_next_brick_view_on_loading()
	}
}

reset.addEventListener('click', function () {
	while(next_brick>0) {
		remove_brick_from_scene(bricksArray[next_brick-1])
	}
})

next.addEventListener('click', function () {
	__handleNextClick()
})

previous.addEventListener('click', function() {
	if(next_brick === 0) {
		return
	}
	else {
		remove_brick_from_scene(bricksArray[next_brick-1])
	}
})

var remove_brick_from_scene = function (brick) {
	scene.remove(brick)
	__decrementNextBrick()
}

var handle_next_brick_view_on_loading = function () {
	__disabledNextBtn()
	__changeBtnValue(next, 'LOADING..')
}

var __disabledNextBtn = function () {
	next.disabled = true
}

var __enableBtn = function (btn) {
	btn.disabled = false
}

var __changeBtnValue = function (btn, value) {
	btn.value = value
}

var init = function () {
	container = document.getElementById( 'container' )

	camera = new THREE.PerspectiveCamera( 15, window.innerWidth / window.innerHeight, 1, 1000 )
	camera.position.set( 11, 11, 11 )

	scene = new THREE.Scene()
	scene.background = new THREE.Color( 0xffffff )
	var ambientLight = new THREE.AmbientLight( 0xcccccc )
	scene.add( ambientLight )

	var directionalLight = new THREE.DirectionalLight( 0xffffff )
	directionalLight.position.set( 0, 1, -1 ).normalize()
	scene.add( directionalLight )

	renderer = new THREE.WebGLRenderer()
	renderer.setPixelRatio( window.devicePixelRatio )
	renderer.setSize( window.innerWidth, window.innerHeight )
	container.appendChild( renderer.domElement )

	controls = new THREE.OrbitControls( camera, renderer.domElement )

	stats = new Stats()
	container.appendChild( stats.dom )

	window.addEventListener( 'resize', onWindowResize, false )

}

var onWindowResize = function() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize( window.innerWidth, window.innerHeight )
}

var animate = function() {
	requestAnimationFrame( animate )
	render()
	stats.update()
}

var render = function () {
	camera.lookAt( scene.position )
	renderer.render( scene, camera )
}

init()
animate()
