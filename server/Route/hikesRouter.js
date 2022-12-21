const express = require("express");
const router = express.Router();
const hikeController = require("../Controller/HikeController");
const { check, validationResult } = require("express-validator");
const { check_hike } = require("../DAO/hikeDAO");
const { errorResponse } = require("./utils")

// GET request to /api/hikes to obtain a list of all hikes
router.get("", async (req, res) => {
	await hikeController
		.getAllHikes()
		.then((hikes) => {
			return res.status(200).json(hikes);
		})
		.catch((err) => {
			return errorResponse(err, 500, res)
		});
});

// GET request to /api/hikes/:hikeID to obtain the selected hike
router.get(
	"/:hikeID",
	check("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		await hikeController
			.getHike(req.params.hikeID)
			.then((hike) => {
				return res.status(200).json(hike);
			})
			.catch((err) => {
				return errorResponse(err, 500, res)
			});
	}
);

// GET request to /api/hikes/:hikeID/track to obtain coordinates of track points of selected track
router.get(
	"/:hikeID/track",
	check("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {
		const hikeID = req.params.hikeID;

		await hikeController
			.getHikeTrack(hikeID)
			.then((track) => {return res.json(track)})
			.catch((err) => {
				return errorResponse(err, 500, res)
			});
	}
)

// returns all huts close the given hike
router.get("/:hikeID/huts",
	check("hikeID").not().isEmpty().isInt({ min: 0 }),
	async(req,res)=>{
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res)

		await hikeController.getCloseHutsForHike(req.params.hikeID)
		.then((msg) => {
			return res.status(201).json(msg);
		})
		.catch((err) => {
			return errorResponse(err, 500, res)
		});
	}
);

//link the hut whose id is hutID to the hike whose id is hikeID 
router.post("/:hikeID/huts/:hutID",
	check("hikeID").not().isEmpty().isInt({ min: 0 }),
	check("hutID").not().isEmpty().isInt({ min: 0 }),
	async(req,res)=>{
		const errors = validationResult(req);
		if(!errors.isEmpty())
			return errorResponse(errors.array(), 422, res)
		
		await hikeController.linkHutToHike(req.params.hutID,req.params.hikeID)
		.then((msg)=>{
			return res.status(201).json(msg);
		})
		.catch((err)=>{
			return errorResponse(err,500,res)
		});
	}
);

//delete the link between the hut whose id is hutID and the hike whose id is hikeID 
router.delete("/:hikeID/huts/:hutID",
	check("hikeID").not().isEmpty().isInt({ min: 0 }),
	check("hutID").not().isEmpty().isInt({ min: 0 }),
	async(req,res)=>{
		const errors = validationResult(req);
		if(!errors.isEmpty())
			return errorResponse(errors.array(), 422, res)
		
		await hikeController.deleteHutToHikeLink(req.params.hutID,req.params.hikeID)
		.then((msg)=>{
			return res.status(201).json(msg);
		})
		.catch((err)=>{
			return errorResponse(err,500,res)
		});
	}
);

// GET request to /api/hikes/:hikeID/referencePoints to obtain referencePoints of a certain hike
router.get("/:hikeID/referencePoints",
	check("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {


		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res)

		const hikeID = req.params.hikeID

		await hikeController
			.getReferencePointsForHike(hikeID)
			.then((msg) => {
				return res.status(201).json(msg);
			})
			.catch((err) => {
				return errorResponse(err, 500, res)
			});

	})

// POST request to /api/hikes to add a new hike
router.post("",
	check(["title", "difficulty", "municipality", "province"]).not().isEmpty().trim().escape(),
	check(["description"]).optional().trim().escape(),
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res)

		let newHike = req.body;
		newHike.hikeID = null;

		await hikeController
			.addHike(newHike)
			.then((msg) => {
				{
					return res.status(201).json(msg);
				}
			})
			.catch((err) => {
				return errorResponse(err, 500, res)
			});

	}
);

//POST request to /api/hikes/referencePoints to save a referencePoint in the database
router.post("/referencePoints",
	check(["hikeID", "referencePoint.creatorID"]).not().isEmpty().isInt({ min: 0 }),
	check(["referencePoint.name", "referencePoint.description", "referencePoint.municipality",
		"referencePoint.country", "referencePoint.province"]).not().isEmpty().trim().escape(),
	check(["referencePoint.longitude", "referencePoint.latitude",
		"referencePoint.altitude"]).isFloat().not().isEmpty().trim().escape(),
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res)

		const hikeID = req.body.hikeID;
		let referencePoint = req.body.referencePoint;
		referencePoint.type = "generic"

		await hikeController
			.addReferencePoint(hikeID, referencePoint)
			.then((msg) => {
				return res.status(201).json(msg);
			})
			.catch((err) => {
				return errorResponse(err, 500, res)
			});

	})


// PUT request to /api/hikes to update an existing hike
router.put("",
	check(["hikeID", "length", "expectedTime", "ascent"]).not().isEmpty().isInt({ min: 0 }),
	check(["title", "description", "difficulty", "municipality", "province"]).not().isEmpty().trim().escape(),
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res)


		let present = check_hike(req.body.hikeID);
		if (!present)
			return errorResponse({ error: `No hike with the given ID found` }, 404, res)

		let hike = req.body

		await hikeController
			.updateHike(hike)
			.then((msg) => {
				res.status(201).json(msg);
			})
			.catch((err) => {
				console.error(err);
				return errorResponse(err, 500, res)
			});
	}
);

// POST request to store link a start point to an hike
router.post("/start",
	check(["hikeID", "startPointID"]).not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res)

		await hikeController.setStart(req.body.hikeID, req.body.startPointID)
			.then(() => {
				res.status(201).end();
			})
			.catch((err) => {
				console.error(err);
				return errorResponse(err, 500, res)
			});

	})

// PUT request to store link an end point to an hike
router.post("/end",
	check(["hikeID", "endPointID"]).not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res)

		await hikeController.setEnd(req.body.hikeID, req.body.endPointID)
			.then(() => res.status(201).end())
			.catch((err) => {
				console.error(err);
				return errorResponse(err, 500, res)
			});
	}
)

router.get("/:hikeID/linkedHuts",
	check(["hikeID"]).not().isEmpty().isInt({ min: 0 }),
	async(req,res)=>{
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return errorResponse(errors.array(), 422, res)

		await hikeController.getHutsLinkedToHike(req.params.hikeID)
			.then((msg) => res.status(201).json(msg))
			.catch((err) => {
				console.error(err);
				return errorResponse(err, 500, res)
			});
	}
)

// DELETE request to delete an hike
router.delete("/:hikeID",
	check("hikeID").not().isEmpty().isInt({ min: 0 }),
	async (req, res) => {

		let present = await check_hike(req.params.hikeID)
			.catch(err => { return res.status(404).json({ error: err }) })
		if (!present) 
			return errorResponse({ error: `No hike with the given ID found` }, 404, res)

		await hikeController
			.deleteHike(req.params.hikeID)
			.then((msg) => {
				return res.status(201).json(msg);
			})
			.catch((err) => {
				console.error(err);
				return errorResponse(err, 500, res)
			});
	});

module.exports = router;
