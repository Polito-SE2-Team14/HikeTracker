import REST from './REST';
import Hike from '../class/Hike';

const api = '/hikes';

const getAllHikes = async () => {
    try {
        let hikesJson = await REST.GET(api);

        return hikesJson.map(h => new Hike(h.hikeID, h.title, h.length, h.expectedTime, h.ascent, h.difficulty, h.description, null, null));
    }
    catch(e){
        throw e;
    }
};
/*
const getHike = async (hikeID) => {
    try {
        let hikeJson = await REST.GET(`${api}/${hikeID}`);

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
        let hikeJson = await REST.UPDATE('POST', api, body);

        return hikeJson.map(h => new Hike(h.hikeID, h.title, h.length, h.expectedTime, h.ascent, h.difficulty, h.description, null, null));
    }
    catch(e){
        throw e;
    }
};

const addStartPoint = async (hikeID, pointID) => {
    let body = { 
        hikeID: hikeID,
        startPointID: pointID
    };

    try {
        await REST.UPDATE('PUT', api, body);
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
        await REST.UPDATE('PUT', api, body);
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
        await REST.UPDATE('PUT', api, body);
    }
    catch (e) {
        throw e;
    }
};



const HikeAPI = { getAllHikes, newHike, addStartPoint, addEndPoint, addHut };
export default HikeAPI;