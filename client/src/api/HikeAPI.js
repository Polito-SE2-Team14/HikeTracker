import Hike from '../class/Hike';

const SERVER_URL = 'http://localhost:3001/api/';


const getAllHikes = async () => {
    const response = await fetch(SERVER_URL + 'hikes');
    const hikesJson = await response.json();
    if (response.ok) {
        return hikesJson.map(h => new Hike(h.hikeID,h.title,h.length,h.expectedTime,h.ascent,h.difficulty,h.description,null,null));
    }
    else
        throw hikesJson;
};


const HikeAPI = { getAllHikes };
export default HikeAPI;