import REST from './REST';
import Hike from '../class/Hike';
import Point from '../class/Point';

const api = '/hikes';

const getAllHikes = async () => {
    try {
        let response = await REST.GET(api);
        let hikesJson = await response.json();

        return hikesJson.map(h => new Hike(h.hikeID, h.title, h.length, h.expectedTime, h.ascent, h.difficulty, h.description, null, null));
    }
    catch (e) {
        throw e;
    }
};
/*
const getHike = async (hikeID) => {
    try {
        let response = await REST.GET(`${api}/${hikeID}`);
        let hikeJson = await response.json();

        return hikeJson.map(h => new Hike(h.hikeID, h.title, h.length, h.expectedTime, h.ascent, h.difficulty, h.description, null, null));
    }
    catch (e) {
        throw e;
    }
};
*/
const newHike = async (title, length, eta, ascent, difficulty, description) => {
    let body = {
        title: title,
        length: length,
        expectedTime: eta,
        ascent: ascent,
        difficulty: difficulty,
        description: description
    };

    try {
        await REST.UPDATE('POST', api, body, true);

        return true;
    }
    catch (e) {
        throw e;
    }
};

const editHike = async (hikeID, title, length, eta, ascent, difficulty, description) => {
    let body = {
        hikeID: hikeID,
        title: title,
        length: length,
        expectedTime: eta,
        ascent: ascent,
        difficulty: difficulty,
        description: description
    };

    try {
        await REST.UPDATE('PUT', api, body, true);

        return true;
    }
    catch (e) {
        throw e;
    }
}

const addStartPoint = async (hikeID, pointID) => {
    let body = {
        hikeID: hikeID,
        startPointID: pointID
    };

    try {
        await REST.UPDATE('PUT', api, body, true);

        return true;
    }
    catch (e) {
        throw e;
    }
};

const addEndPoint = async (hikeID, pointID) => {
    let body = {
        hikeID: hikeID,
        endPointID: pointID
    };

    try {
        await REST.UPDATE('PUT', api, body, true);

        return true;
    }
    catch (e) {
        throw e;
    }
};

const addHut = async (hikeID, pointID) => {
    let body = {
        hikeID: hikeID,
        hutID: pointID
    };

    try {
        await REST.UPDATE('PUT', api, body, true);

        return true;
    }
    catch (e) {
        throw e;
    }
};

const getHikePoints = async (hikeID) => {
    try {
        let response = await REST.GET(`${api}/${hikeID}/points`);
        let pointsJson = await response.json();

        return pointsJson.map(p => new Point(p.pointID, p.name, p.latitude, p.longitude, p.address, p.pointType));
    } catch (e) {
        throw e;
    }
};



const HikeAPI = { getAllHikes, newHike, editHike, addStartPoint, addEndPoint, addHut, getHikePoints };
export default HikeAPI;