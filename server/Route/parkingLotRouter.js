const express = require("express");
const router = express.Router();
const PLotController = require("../Controller/ParkingLotController");
const pLotController = new PLotController();
const { body, validationResult } = require("express-validator");

router.get("", async(req,res)=>{
	await pLotController
		.getAllParkingLots()
		.then((parkingLots)=>{
			return res.status(200).json(parkingLots);
		})
		.catch(()=>res.status(500).end());
});

router.post("",async(req,res)=>{
	await pLotController
		.addParkingLot(req.body)
		.then(()=>{res.status(200).end()})
		.catch(()=>res.status(500).end());;
});

router.delete("/:pLotId",
	body("pLotId").not().isEmpty().isInt({min:0}),
	async(req,res)=>{

	let found= await pLotController.parkingLotExists(req.params.pLotId)
		.catch(err=>{return res.status(404).json({error : err})});

	if(!found){
		return res.status(404).json({ error: `No parking lot has id ${req.params.pLotId}` });
	}

	await pLotController
		.deleteParkingLot(req.params.pLotId)
		.then(()=>{res.status(200).end()})
		.catch(err=>res.status(503).json({err:`Could not remove parking lot ${req.params.pLotId}: ${err}`}));
})