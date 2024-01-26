var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
const NodeCache = require('node-cache');
const cache = new NodeCache();

/* GET users listing. */
router.get('/', function (req, res) {
	const cacheKey = req.originalUrl || req.url;
	const cachedData = cache.get(cacheKey);

	if (cachedData){
		res.status(200).send({
			success: true,
			data: cachedData
		});
		return ;
	}

	userController.getAllUsers()
	.then((users) => {
			cache.set(cacheKey, users, 20);
			res.status(200).send({
				success: true,
				data: users
			});
		}).catch((err) => {
			res.status(500).send({
				success: false,
				message: err.message
			})
		})
});

router.get('/currentUser/', function (req, res) {
	if (req.headers.authorization == undefined){
		res.status(401).send({
			success: false,
			message: "Invalid JWT token"
		})
	}else {
		const authorization = req.headers.authorization.split(' ')
		if (authorization[0] == 'Bearer') {
			userController.getCurrentUser(authorization[1])
				.then((response) => {
					res.send({
						success: true,
						data: response
					})
				})
		} else {
			res.status(401).send({
				success: false,
				message: 'No JWT token submitted'
			})
		}
	} 
});

router.get('/one/:id', function (req, res) {
	if (!isNaN(parseInt(req.params.id))) {
		userController.getOneUser(parseInt(req.params.id))
			.then((user) => {
				if (!user) {
					res.status(404).send({
						success: false,
						message: 'No user found for id : "' + req.params.id + '"'
					})
				} else {
					res.status(200).send({
						success: true,
						data: user
					})
				}
			}).catch((err) => {
				res.status(500).send({
					success: false,
					data: err.message
				})
			})
	} else {
		res.status(400).send({
			success: false,
			message: 'Invalid parameter'
		})
	}
});

router.post('/login', (req, res) => {
	if (req.body.password && req.body.email) {
		userController.logUser(req.body.email.toLowerCase(), req.body.password)
			.then((responseObject) => {
				if (responseObject.error) {
					res.status(responseObject.status).send({
						success: false, 
						message: responseObject.message
					})
				} else {
					res.status(200).send({
						success: true,
						data: {
							token: responseObject.token,
							maxAge: responseObject.maxAge
						}
					})
				}
			})
	} else {
		res.status(400).send({
			success: false,
			message: 'Invalid credentials'
		})
	}
})

router.post('/register/', (req, res) => {
	if (req.body.firstname && req.body.lastname && req.body.email && req.body.password) {
		userController.registerUser(req.body.firstname, req.body.lastname, req.body.email, req.body.password)
			.then((objectResponse) => {
				if (!objectResponse.error) {
					res.status(201).send({
						success:true,
						data:{
							token: objectResponse.token, 
							maxAge: 259560000 
						}
					})
				} else {
					res.status(objectResponse.status).send({
						success: false,
						message: objectResponse.message 
					})
				}
			})
	} else {
		res.status(400).send({
			success: false,
			message: 'Invalid parameters'
		})
	}
})

router.patch('/modify/:userId', (req, res) => {
	let userId = req.params.userId
	const updateData = req.body;

	userController.updateUser(userId, updateData)
		.then(result => {
			res.send(result)
		})
})

router.delete('/', (req, res) => {
	if (req.headers.authorization == undefined){
		res.status(400).send({
			success: false,
			message: "Invalid JWT token"
		})
	}else{
		let authorization = req.headers.authorization.split(' ')
		if (authorization[0] == 'Bearer') {
			userController.deleteUser(authorization[1])
				.then(result => {
					if (result.error != undefined){
						res.status(404).send({
							success: false,
							data : result
						})
					}else{
						res.status(202).send({
							success: true,
							mssage : 'User successfully deleted'
						})
					}
				})
		}else {
			res.status(400).send({
				success: false,
				message: "Invalid JWT token"
			})
		}	
	}
})

module.exports = router;
