var express = require("express");
var router = express.Router();
var matchController = require("../controller/matchController");
const NodeCache = require("node-cache");
const cache = new NodeCache();

router.get("/", (req, res) => {
	const cacheKey = req.originalUrl || req.url;
	const cachedData = cache.get(cacheKey);
	if (cachedData) {
		res.status(200).send({
			success: true,
			data: cachedData,
		});
	} else {
		matchController
			.getAllMatches()
			.then((matches) => {
				res.status(200).send({
					success: true,
					data: matches,
				});
			})
			.catch((err) => {
				res.status(500).send({
					success: false,
					message: err.message,
				});
			});
	}
});

router.get("/one/:id", (req, res) => {
	const cacheKey = req.originalUrl || req.url;
	const cachedData = cache.get(cacheKey);
	if (cachedData) {
		res.status(200).send({
			success: true,
			data: cachedData,
		});
	} else {
		matchController.getMatch(req.params.id).then((match) => {
            if (!match){
                res.status(404).send({
                    success: false,
                    message: "Match not found"
                });
            }else{
                res.status(200).send({
                    success: true,
                    data: match,
                });
            }
		});
	}
});

router.post("/", (req, res) => {
    matchController.postMatch(req.body, req.cookies.access_token).then((response) => {
        res.status(201).send({
            success: true,
            message: response
        });
    });
});

module.exports = router;
