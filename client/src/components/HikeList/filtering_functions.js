import { isInArea } from "../HikeData";

function filterHike(hike, filters) {

	if (!hike.title.toLowerCase().includes(filters.title.toLowerCase())) {
		return false;
	}


	let point = hike.track ? {
		latitude: hike.track[0][0],
		longitude: hike.track[0][1],
	} : null;

	if (filters.area && point && !isInArea(point, filters.area)) {
		return false;
	}

	if (!hike.country.startsWith(filters.country)
		|| !hike.province.startsWith(filters.province)
		|| !hike.municipality.startsWith(filters.municipality)) {
		return false;
	}



	if (filters.difficulties.length !== 0 && !filters.difficulties.includes(hike.difficulty)) {
		return false;
	}

	if (hike.length > filters.length[1] * 1000 || hike.length < filters.length[0] * 1000) {
		return false;
	}

	if (hike.ascent > filters.ascent[1] || hike.ascent < filters.ascent[0]) {
		return false;
	}

	return !(hike.expectedTime > filters.expectedTime[1] || hike.expectedTime < filters.expectedTime[0])
}

export async function filterAllHikes(hikes_list, filters) {
	return hikes_list.filter((hike) => {
		return filterHike(hike, filters);
	}
	)
}