const { application } = require('express');
const express = require('express');
const router = express.Router()
const prefixRoute = '/api/';
const hikeDAO = require('../DAO/hikeDAO');

const isLoggedIn = router.get('isLoggedIn')

// hike calls
router.get(prefixRoute + '/hikes',async(req,res)=>{
	hikeDAO.getAllHikes()
	.then(hikes=>res.json(hikes))
	.catch(()=>res.status(500).end());
});

router.post(prefixRoute + '/hikes', async(req,res)=>{
	try{
		if (!check_hike(req.body.hike)){
			res.status(404).json({error:`Invalid fields in the inserted hike`});
			return;
		}
		await hikeDAO.addHike(req.body.hike);
	}catch(err){
		res.status(503).json({error:`Database error during the adding of hike ${req.body.hike.hikeID} in the database`});
	}
});

router.put(prefixRoute + 'hikes', async(req,res)=>{
	try{
		await hikeDAO.updateHike(req.body.hike);
	}catch(err){
		res.status(404).json({error:"Hike not found"})
	}
});

module.exports = router;
