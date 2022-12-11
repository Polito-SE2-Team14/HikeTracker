import { isInArea } from "../HikeData";

function filterHike(hike, filters){
	let to_return = true;

	if(!hike.title.toLowerCase().includes(filters.title.toLowerCase())){
		to_return = false;
	}
	
	
	let point = hike.track ? {
		latitude: hike.track[0][0],
		longitude: hike.track[0][1],
	} : null;

	if(filters.area && point && !isInArea(point, filters.area)){
		to_return = false;
	}

	if(!hike.country.startsWith(filters.country)){
		to_return = false;
	}

	if(!hike.province.startsWith(filters.province)){
		to_return = false;
	}

	if(!hike.municipality.startsWith(filters.municipality)){
		to_return = false;
	}

	if(filters.difficulties.length !== 0 && !filters.difficulties.includes(hike.difficulty)){
		to_return = false;
	}
	
	if(hike.length > filters.length[1]*1000 || hike.length < filters.length[0]*1000){
		to_return = false;
	}

	if(hike.ascent > filters.ascent[1] || hike.ascent < filters.ascent[0]){
		to_return = false;
	}

	if(hike.ascent > filters.ascent[1] || hike.ascent < filters.ascent[0]){
		to_return = false;
	}

	if(hike.expectedTime > filters.expectedTime[1] || hike.expectedTime < filters.expectedTime[0]){
		to_return = false;
	}

	return to_return;
}

export async function filterAllHikes(hikes_list,filters){
	return hikes_list.filter((hike) => {
		return filterHike(hike, filters);}
	)
}