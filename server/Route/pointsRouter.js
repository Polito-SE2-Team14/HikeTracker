const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator');
const pointController = require("../Controller/PointController")
const hutController = require("../Controller/HutController")

router.get('', async (req, res) => {
	await pointController.getAllPoints()
		.then(points => res.json(points))
		.catch((err) => {
			console.error(err);
			return res.status(500).end();
		});
});


router.get('/huts', async (req, res) => {
	await hutController.getHuts()
		.then(huts => { { console.log(huts.map(h => h.pointID)); return res.status(200).json(huts) } })
		.catch((err) => {
			console.error(err);
			return res.status(500).end();
		});

});

router.get('/:pointID',
	check("pointID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		await pointController.getPoint(req.params.pointID)
			.then(point => res.json(point))
			.catch((err) => {
				console.error(err);
				return res.status(500).end();
			});
	});

router.post('/huts',
	check(["name", "address", "province", "municipality"]).not().isEmpty().trim().escape(),
	check(["longitude", "latitude"]).isFloat().not().isEmpty().trim().escape(),
	check(["bedspace", "hutOwnerID"]).isInt({ min: 0 }).not().isEmpty().trim().escape(),
	async (req, res) => {


		if (!validationResult(req).isEmpty()) {
			console.error(validationResult(req).array())
			return res.status(422).json({ err: validationResult(req).array })
		}

		await hutController.createHut(req.body)
			.then(hut => res.status(204).json(hut))
			.catch((err) => {
				console.error(err);
				return res.status(500).end();
			});
	});

router.put('/huts',
	check(["pointID", "bedspace", "hutOwnerID"]).isInt({ min: 0 }).not().isEmpty().trim().escape(),
	check(["name", "address", "province", "municipality"]).not().isEmpty().trim().escape(),
	check(["latitude", "longitude"]).isFloat().not().isEmpty().trim().escape(),
	async (req, res) => {

		if (!validationResult(req).isEmpty()) {
			console.error(validationResult(req).array())
			return res.status(422).json({ err: validationResult(req).array })
		}

		await hutController.updateHut(req.body)
			.then(hut => res.status(204).send())
			.catch((err) => {
				console.error(err);
				return res.status(500).end();
			});
	});


router.delete('/huts/:hutID',
	check("hutID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		await hutController.deleteHut(req.params.hutID)
			.then(() => res.status(204).send())
			.catch((err) => {
				console.error(err);
				return res.status(500).end();
			});
	})


module.exports = router;
