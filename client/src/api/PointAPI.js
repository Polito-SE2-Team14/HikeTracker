import REST from "./REST";

const api = "/points";

/**
 * Returns all huts in the database
 * @returns {Hut[]} Array of all huts
 */
const getAllHuts = async () => {
	try {
		let response = await REST.GET(`${api}/huts`);
		let hutsJson = await response.json();

		return hutsJson;
	} catch (err) {}
};

const createHut = async (hut) => {
	try {
		console.log(hut)
		let response = await REST.UPDATE("POST", `${api}/huts`, hut)
		if (!response.status)
			throw Error()
	}
	catch (err) {
		throw err
	}
}

const PointAPI = { getAllHuts, createHut};
export default PointAPI;
