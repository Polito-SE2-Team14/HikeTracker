const express = require('express');
const router = express.Router()
const prefixRoute = '/api';
const pointsDAO = require('../DAO/pointsDAO')



router.get(prefixRoute + '/points', async (req, res) => {
	await pointsDAO.getAllPoints()
		.then(points => res.json(points))
		.catch(err => res.status(err.code).send(err.msg))
});

router.get(prefixRoute + '/huts', async (req, res) => {
	await pointsDAO.getHuts()
		.then(huts => res.json(huts))
		.catch(err => res.status(err.code).send(err.msg))
});

router.post(prefixRoute + '/huts', async (req, res) => {

	const hut = req.body.hut;

	await pointsDAO.createHut(hut)
		.then(() => res.status(200).end())
		.catch(err => res.status(err.code).send(err.msg))
});

router.get(prefixRoute + '/parkinglots', async (req, res) => {
	await pointsDAO.getParkingLots()
		.then(parkingLots => res.json(parkingLots))
		.catch(err => res.status(err.code).send(err.msg))
});

router.post(prefixRoute + '/parkinglots', async (req, res) => {

	const parkingLot = req.body.parkingLot;

	await pointsDAO.createParkingLot(parkingLot)
		.then(() => res.status(200).end())
		.catch(err => res.status(err.code).send(err.msg))
});

module.exports = router;
