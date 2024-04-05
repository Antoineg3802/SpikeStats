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
            .getAllMatches(req.cookies.access_token)
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
        matchController.getMatch(req.cookies.access_token, req.params.id).then((match) => {
            if (match.error) {
                res.status(match.status).send({
                    success: false,
                    message: match.message,
                });
            } else {
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
        if (response.error) {
            res.status(response.status).send({
                success: false,
                message: response.message
            });
        } else {
            res.status(201).send({
                success: true,
                message: response
            });
        }
    });
});

router.post("/:matchId/set", (req, res) => {
    matchController.addSet(req.params.matchId, req.body, req.cookies.access_token).then((response) => {
        if (response.error) {
            res.status(response.status).send({
                success: false,
                message: response.message
            });
        } else {
            res.status(201).send({
                success: true,
                message: 'Set added'
            });
        }
    });
})

// router.delete("/:matchId", (req, res) => {
// 	matchController.deleteMatch(req.params.matchId, req.cookies.access_token).then((response) => {
// 		if (response.error) {
// 			res.status(response.status).send({
// 				success: false,
// 				message: response.message
// 			});
// 		}else{
// 			res.status(200).send({
// 				success: true,
// 				message: 'Match deleted'
// 			});
// 		}
// 	});
// })

module.exports = router;