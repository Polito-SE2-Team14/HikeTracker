const express = require("express");
const router = express.Router();
const hikeController = require("../Controller/HikeController");
const pointController = require("../Controller/PointController");
const { body, validationResult } = require("express-validator");
const { check_hike } = require("../DAO/hikeDAO");

// GET request to /api/hikes to obtain a list of all hikes
router.get("", async (req, res) => {
	await hikeController
		.getAllHikes()
		.then((hikes) => {
			return res.status(200).json(hikes);
		})
		.catch((err) => {
			console.error(err)
			return res.status(500).end()
		});
});

// GET request to /api/hikes/:hikeID to obtain the selected hike
router.get(
	"/:hikeID",
	body("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		await hikeController
			.getHike(req.params.hikeID)
			.then((hike) => {
				return res.status(200).json(hike);
			})
			.catch((err) => {
				console.error(err)
				return res.status(500).end()
			});
	}
);

// GET request to /api/hikes/:hikeID/track to obtain coordinates of track points of selected track
router.get(
	"/:hikeID/track",
	body("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		const hikeID = req.params.hikeID;

		await hikeController
			.getHikeTrack(hikeID)
			.then((track) => res.json(track))
			.catch((err) => {
				console.error(err);
				return res.status(500).end()
			});
	}
)

// GET request to /api/hikes/:hikeID/referencePoints to obtain referencePoints of a certain hike
router.get("/:hikeID/referencePoints",
	body("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(505).json(errors.array());

		const hikeID = req.params.hikeID

		await hikeController
			.getReferencePointsForHike(hikeID)
			.then((msg) => {
				return res.status(201).json(msg);
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).end()
			});

	})

// POST request to /api/hikes to add a new hike
router.post("",
	body(["title", "difficulty", "municipality", "province"]).not().isEmpty().trim().escape(),
	body(["description"]).optional().trim().escape(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(505).json(errors.array());

		let newHike = req.body;
		newHike.hikeID = null;

		await hikeController
			.addHike(newHike)
			.then((msg) => {
				return res.status(201).json(msg);
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).end()
			});

	}
);

//POST request to /api/hikes/referencePoints to save a referencePoint in the database
router.post("/referencePoints",
	body(["hikeID", "referencePointID"]).not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(505).json(errors.array());


		const hikeID = req.body.hikeID;
		const referencePointID = req.body.referencePointID;

		await hikeController
			.addReferencePoint(hikeID, referencePointID)
			.then((msg) => {
				return res.status(201).json(msg);
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).end()
			});

	})


// PUT request to /api/hikes to update an existing hike
router.put("",
	body(["hikeID", "length", "expectedTime", "ascent"]).not().isEmpty().isInt({ min: 0 }),
	body(["title", "description", "difficulty", "municipality", "province"]).not().isEmpty().trim().escape(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors.array());
			return res.status(422).json(errors.array());
		}

		let present = check_hike(req.body.hikeID);
		if (!present) {
			return res.status(404).json({ error: `No hike with the given ID found` });
		}

		let hike = req.body

		console.log("update", req.body)

		await hikeController
			.updateHike(hike)
			.then((msg) => {
				res.status(201).json(msg);
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).end()
			});
	}
);

// PUT request to store link a start point to an hike
router.put("/start",
	body(["hikeID", "startPointID"]).not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {

		await hikeController.setStart(req.body.hikeID, req.body.startPointID)
			.then(() => {
				res.status(201).end();
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).end()
			});

	})

// PUT request to store link an end point to an hike
router.put("/end",
	body(["hikeID", "endPointID"]).not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {

		await hikeController.setEnd(req.body.hikeID, req.body.endPointID)
			.then(() => res.status(201).end())
			.catch((err) => {
				console.error(err);
				return res.status(500).end()
			});
	}


)

// DELETE request to delete an hike
router.delete("/:hikeID",
	body("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {

		let present = await check_hike(req.params.hikeID)
			.catch(err => { return res.status(404).json({ error: err }) })
		if (!present) {
			return res.status(404).json({ error: `No hike with the given ID found` });
		}

		await hikeController
			.deleteHike(req.params.hikeID)
			.then((msg) => {
				res.status(201).json(msg);
			})
			.catch((err) => {
				console.error(err);
				return res.status(500).end()
			});

	});

module.exports = router;
