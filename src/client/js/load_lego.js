var id = 1
var objURL, mtlURL

var __loadBrick = function (id) {
	__fetchURLS(id)
}

var __fetchURLS = function (id) {
	axios.post('/redisRequest', {
		id
	})
	.then(function (response) {
		__setURLS(response, __loadMtl)
	})
	.catch(function(error) {
		console.log(error)
	})
}

var __setURLS = function (response, callback) {
	if(response.data.finished) {
		finished = true
		return
	}
	else {
		mtlURL = response.data.mtlURL
		objURL = response.data.objURL
		callback(__loadObj)
	}

}

var __loadMtl = function (callback) {
	THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader() )
	var mtlLoader = new THREE.MTLLoader()
	mtlLoader.load(mtlURL, callback)
}

var __loadObj = function (materials) {
	materials.preload()
	var objLoader = new THREE.OBJLoader()
	objLoader.setMaterials(materials)
	objLoader.load(objURL, __pushBrickToArray, onProgress, onError)
}

var __pushBrickToArray = function (brick) {
	bricksArray.push(brick)
	__enableBtn(next)
	__changeBtnValue(next, 'NEXT')
	__loadBrick(id+=2)
}

__loadBrick(id)
