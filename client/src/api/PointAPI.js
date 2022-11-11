import REST from './REST';
import Point from '../class/Point';

const api = '/points';

const getHikePoints = async (hikeID) => {
    try {
        let pointsJson = await REST.GET(`${api}/${hikeID}`);

        return pointsJson.map(p => new Point(p.pointID, p.name, p.latitude, p.longitude, p.address, p.pointType));
    }
    catch (e) {
        throw e;
    }
};

const PointAPI = { getHikePoints };
export default PointAPI;