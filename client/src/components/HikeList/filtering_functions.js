// TODO(antonio): to fix slowness rewrite!!!!!!!!!!!!

function filterHike(hike, filters){
	let invalids = [];
	let to_return = true;

	if(!hike.title.toLowerCase().includes(filters.title.toLowerCase())){
		to_return = false;
	}

	// TODO(antonio): check area from starting point coords
/* 	if(filters.area){
		to_return = false;
	} */

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

function filterAllHikes(hikes_list,filters){
	/* return hikes_list.map(function(hike){
		hike.show=filterHike(hike,filters);
		return hike;
	}); */
	return hikes_list.filter((hike) => 
		filterHike(hike, filters)
	)
}

export {filterHike, filterAllHikes}