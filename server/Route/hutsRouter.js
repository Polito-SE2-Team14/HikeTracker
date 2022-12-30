const express = require("express");
const router = express.Router();
const hutController = require("../Controller/HutController");
const { check, validationResult } = require("express-validator");
const { errorResponse } = require("./utils")

router.get('', async (req, res) => {
	await hutController.getHuts()
		.then(huts => { return res.status(200).json(huts) })
		.catch((err) => {
			return errorResponse(err, 500, res)
		});
});

// GET request to /api/huts/:hutID/image to obtain hut image
router.get(
	"/:hutID/image",
	check("hutID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		const hutID = req.params.hutID;

		await hutController
			.getHutImage(hutID)
			.then((image) => { return res.json(image) })
			.catch((err) => {
				return errorResponse(err, 500, res)
			});
	}
);

router.post('',
	check(["name", "description", "address", "country", "province", "municipality", "website"]).not().isEmpty().trim().escape(),
	check(["longitude", "latitude", "altitude"]).isFloat().not().isEmpty().trim().escape(),
	check(["bedspace", "creatorID"]).isInt({ min: 0 }).not().isEmpty().trim().escape(),
	check(["phoneNumber"]).isInt().not().isEmpty().trim().escape(),
	async (req, res) => {


		if (!validationResult(req).isEmpty()) {
			return errorResponse(validationResult(req).array(), 422, res)
		}

		await hutController.createHut(req.body)
			.then(hut => res.status(204).json(hut))
			.catch((err) => {
				return errorResponse(err, 500, res)
			});
	});

//check on body
router.post('/:hutID/image',
	check("hutID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res);

		await hutController.newHutImage(req.params.hutID, req.body.image)
			.then(() => res.status(201))
			.catch((err) => errorResponse(err, 500, res));
	});


router.put('',
	check(["pointID", "bedspace"]).isInt({ min: 0 }).not().isEmpty().trim().escape(),
	check(["name", "address", "province", "municipality"]).not().isEmpty().trim().escape(),
	check(["latitude", "longitude"]).isFloat().not().isEmpty().trim().escape(),
	async (req, res) => {

		if (!validationResult(req).isEmpty()) {
			return errorResponse(validationResult(req).array(), 422, res)
		}

		await hutController.updateHut(req.body)
			.then(hut => res.status(204).send())
			.catch((err) => {
				return errorResponse(err, 500, res)
			});
	});


router.delete('/:hutID',
	check("hutID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		await hutController.deleteHut(req.params.hutID)
			.then(() => res.status(204).send())
			.catch((err) => {
				return errorResponse(err, 500, res)
			});
	})

module.exports = router;
