import REST from "./REST";

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
			(pL) => {
				return {
					pLotId: pL.pLotId,
					name: pL.name,
					carspace: Number(pL.carspace),
					municipality: pL.municipality,
					province: pL.province,
					latitude: Number(pL.latitude),
					longitude: Number(pL.longitude),
					pointID: pL.pointID,
					address: pL.address,
					pointType: pL.pointType
				}
			}
		);
	} catch (err) {
		console.error("Error in ParkingLotAPI.js", err)
		throw err;
	}
}

const addParkingLot = async (ParkingLotToAdd) => {
	let body =  ParkingLotToAdd ;

	try {
		await REST.UPDATE("POST", api, body, true);

		return true;
	} catch (err) {
		console.error("Error in ParkingLotAPI.js", err)
		throw err;
	}
}

const deleteParkingLot = async(idToDelete) =>{
	try {
		await REST.DELETE(`${api}/${idToDelete}`);
		return true;
	} catch (err) {
		console.error("Error in ParkingLotAPI.js", err)
		throw err;
	}
}

const ParkingLotAPI = { getAllParkingLots, addParkingLot, deleteParkingLot }

export default ParkingLotAPI;