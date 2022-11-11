import Point from '../class/Point';

const SERVER_URL = 'http://localhost:3001/api/';


const getHikePoints = async (hikeID) => {
    const response = await fetch(SERVER_URL + 'hike-points/' + hikeID);
    const pointsJson = await response.json();
    if (response.ok) {
        return pointsJson.map((p) => new Point(p.pointID, p.name, p.latitude, p.longitude, p.address, p.pointType));
    }
    else
        throw pointsJson;
};


const PointAPI = { getHikePoints };
export default PointAPI;