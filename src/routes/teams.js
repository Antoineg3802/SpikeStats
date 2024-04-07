const express = require('express');
const router = express.Router();
const NodeCache = require('node-cache');
const cache = new NodeCache();
var teamController = require('../controller/teamController');

// Get all teams
router.get('/', (req, res) => {
    const cacheKey = req.originalUrl || req.url;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        res.status(200).send({
            success: true,
            data: cachedData
        });
        return;
    }

    teamController.getAllTeams()
        .then((teams) => {
            res.status(200).send({
                success: true,
                data: teams
            })
        })
        .catch((err) => {
            res.status(500).send({
                success: false,
                message: err.message
            })
        })
});

// Get a specific team
router.get('/one/:id', (req, res) => {
    const cacheKey = req.originalUrl || req.url;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        res.status(200).send({
            success: true,
            data: cachedData
        });
        return;
    }

    teamController.getTeam(req.params.id)
        .then((team) => {
            if (team.error) {
                res.status(team.status).send({
                    success: false,
                    message: "Team not found"
                })
            } else {
                res.status(200).send({
                    success: true,
                    data: team
                })
            }
        })
});

// Create a new team
router.post('/', (req, res) => {
    if (req.body.name && req.body.description) {
        let userId = req.body.userId ? req.body.userId : null
        teamController.postTeam(req.body.name, req.body.description, userId, req.cookies.access_token)
            .then((response) => {
                if (response.error) {
                    res.status(response.status).send({
                        success: false,
                        message: response.message
                    })
                } else {
                    res.status(201).send({
                        success: true,
                        data: response
                    })
                }
            })
    } else {
        res.status(400).send({
            success: false,
            message: 'Invalid keys provided'
        })
    }

});

// Delete a team
router.delete('/:id', (req, res) => {
    const teamIndex = teams.findIndex((team) => team.id === req.params.id);
    if (teamIndex !== -1) {
        const deletedTeam = teams.splice(teamIndex, 1);
        res.json(deletedTeam[0]);
    } else {
        res.status(404).json({ message: 'Team not found' });
    }
});

router.get('/mine', (req, res) => {
    const cacheKey = req.originalUrl || req.url;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        res.status(200).send({
            success: true,
            data: cachedData
        });
        return;
    }
    teamController.getMyTeams(req.cookies.access_token)
        .then((response) => {
            if (response.error) {
                res.status(response.status).send({
                    success: false,
                    message: response.message
                })
            } else {
                res.status(200).send({
                    success: true,
                    data: response
                })
            }
        })
});

router.post('/join', (req, res) => {
    teamController.joinTeam(req.body.invitationCode, req.cookies.access_token)
        .then((response) => {
            if (response.error) {
                res.status(response.status).send({
                    success: false,
                    message: response.message
                })
            } else {
                res.status(200).send({
                    success: true,
                    data: response
                })
            }
        })
});

module.exports = router;