import REST from "./REST";
import ParkingLot from "../class/ParkingLot";

const api = "/parkinglots";


/**
 * Returns all the parking lots
 * @returns {ParkingLot[]} Array containg the parking lots
 */
const getAllParkingLots = async () => {
	try {
		let response = await REST.GET(api);
		let returnedJson = await response.json();

		return returnedJson.map(
			(pL) =>
				new ParkingLot(pL.parkingLotID,pL.carspace)
		);
	} catch(err){
		throw err;
	}
}

const addParkingLot = async(ParkingLotToAdd) =>{
	let body={ParkingLotToAdd};

	try{
		await REST.UPDATE("POST", api, body, true);

		return true;
	} catch(err){
		throw err;
	}
}

const deleteParkingLot = async(idToDelete) =>{
	try {
		await REST.DELETE(`${api}/${idToDelete}`);
		return true;
	}catch(err){
		throw err;
	}
}

const ParkingLotAPI={getAllParkingLots, addParkingLot, deleteParkingLot}

export default ParkingLotAPI;