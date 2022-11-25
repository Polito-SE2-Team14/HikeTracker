const pLotDAO = require("../DAO/parkingLotDAO");

class ParkingLotController{
	constructor() {}

	async getAllParkingLots(){
		const parkingLots = await pLotDAO.getAllParkingLots().catch(()=>{
			throw Error();
		});
		return parkingLots;
	}

	async getParkingLotById(id){
		const parkingLot = await pLotDAO.getParkingLotById(id).catch(()=>{
			throw Error();
		});
		return parkingLot;
	}

	async parkingLotExists(pLotId){
		const exists = await pLotDAO.parkingLotExists(pLotId).catch(()=>{
			throw Error();
		});
		return exists;
	}

	async addParkingLot(newPLot){
		const addedPLot = await pLotDAO.addParkingLot(newPLot).catch((err)=>{
			throw err;
		});
		return addedPLot;
	}

	async deleteParkingLot(pLotId){
		await pLotDAO.deleteParkingLot(pLotId).catch(err=>{
			throw err;
		});
	}
}
module.exports = ParkingLotController;