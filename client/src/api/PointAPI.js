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

const PointAPI = { getAllHuts};
export default PointAPI;
