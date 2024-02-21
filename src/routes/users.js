var express = require('express');
var router = express.Router();
const NodeCache = require('node-cache');
const cache = new NodeCache();
var userController = require('../controller/userController');

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
	const token = req.cookies.access_token;
	if (!token) {
		res.status(401).send({
			success: false,
			message: "Invalid JWT token"
		});
	} else {
		userController.getCurrentUser(token)
			.then((response) => {
				if(response.error){
					res.send({
						success: false,
						data: response.message
					});
				}else{
					res.send({
						success: true,
						data: response
					});
				}
			});
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
					res.cookie("access_token", responseObject.token, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
					})
					.status(200).send({
						success: true,
						message: "Connected",
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

router.post('/register/player', (req, res) => {
	if (req.body.firstname && req.body.lastname && req.body.email && req.body.password) {
		userController.registerUser(req.body.firstname, req.body.lastname, req.body.email, req.body.password)
			.then((objectResponse) => {
				if (!objectResponse.error) {
					res.status(201).send({
						success:true,
						data: objectResponse
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

router.post('/register/manager', (req, res) => {
	if (req.body.firstname && req.body.lastname && req.body.email && req.body.password) {
		userController.registerUser(req.body.firstname, req.body.lastname, req.body.email, req.body.password, 3)
			.then((objectResponse) => {
				if (!objectResponse.error) {
					res.status(201).send({
						success:true,
						data: objectResponse
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

router.post('/register/admin', (req, res) => {
	// TODO : Add a check to see if the user is an admin to register admin
	if (req.body.firstname && req.body.lastname && req.body.email && req.body.password) {
		userController.registerUser(req.body.firstname, req.body.lastname, req.body.email, req.body.password, 1)
			.then((objectResponse) => {
				if (!objectResponse.error) {
					res.cookie("access_token", objectResponse.token, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
					})
					.status(201).send({
						success:true,
						data: objectResponse.user
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

router.patch('/modify/', (req, res) => {
	const updateData = req.body;
	const token = req.cookies.access_token;

	userController.updateUser(token, updateData)
		.then(result => {
			if (result.error != undefined){
				res.status(result.status).send({
					success: false,
					message : result.message
				})
			}else{
				res.status(202).send({
					success: true,
					data : result
				})
			}
		})
})

router.delete('/', (req, res) => {
	const token = req.cookies.access_token;
	if (token == undefined){
		res.status(400).send({
			success: false,
			message: "Invalid JWT token"
		})
	}else{
		userController.deleteUser(token)
			.then(result => {
				if (result.error != undefined){
					res.status(404).send({
						success: false,
						message : result.message
					})
				}else{
					res.status(202).send({
						success: true,
						message : 'User successfully deleted'
					})
				}
			})
	}
})

module.exports = router;
