const express = require('express');
const router = express.Router()


// hike calls
router.get('/api/hikes',async(req,res)=>{
	hike_dao.listAllHikes()
	.then(hikes=>res.json(hikes))
	.catch(()=>res.status(500).end());
});

router.post('/api/hikes', async(req,res)=>{
	try{
		if (!check_hike(req.body.hike)){
			res.status(404).json({error:`Invalid fields in the inserted hike`});
			return;
		}
		await hike_dao.addHike(req.body.hike);
	}catch(err){
		res.status(503).json({error:`Database error during the adding of hike ${req.body.hike.hikeID} in the database`});
	}
});

router.put('api/hikes/', async(req,res)=>{
	try{
		await hike_dao.updateHike(req.body.hike);
	}catch(err){
		res.status(404).json({error:"Hike not found"})
	}
});

module.exports = router;
