function filterHike(hike, filters){
	let invalids = [];
	let to_return = true;

	if (filters.check_geo_area){
		if (filters.geographic_area === ''){invalids.push(" geographic_area");}
		// geo area check
	}
	if (filters.check_diff){
		if (filters.difficulty===''){invalids.push(" difficulty");}
		else if(hike.difficulty!=filters.difficulty){to_return=false};
	}
	if (filters.check_len){
		if (filters.length<=0){invalids.push(" length (it must be >0)");}
		else{
			switch(filters.length_operator){
				case ">":
					if(hike.length<=filters.length){to_return = false;}
					break;
				case "=":
					if(hike.length!=filters.length){to_return = false;}
					break;
				case "<":
					if(hike.length>=filters.length){to_return = false;}
					break;
				default:
					console.log("Unknown operator");
					break;
			}
		}
	}
	if (filters.check_asc){
		if (filters.ascent<=0){invalids.push(" ascent (it must be >0)");}
		else{
			switch(filters.ascent_operator){
				case ">":
					if(hike.ascent<=filters.ascent){to_return = false;}
					break;
				case "=":
					if(hike.ascent!=filters.ascent){to_return = false;}
					break;
				case "<":
					if(hike.ascent>=filters.ascent){to_return = false;}
					break;
				default:
					console.log("Unknown operator");
					to_return = false;
					break;
			}	
		}
	}
	if (filters.check_exp_time){
		if (filters.expected_time<=0){invalids.push(" expected_time (it must be >0)");}
		else{
			switch(filters.expected_time_operator){
				case ">":
					if(hike.expected_time<=filters.expected_time){to_return=false;}
					break;
				case "=":
					if(hike.expected_time!=filters.expected_time){to_return=false;}
					break;
				case "<":
					if(hike.expected_time>=filters.expected_time){to_return=false;}
					break;
				default:
					console.log("Unknown operator");
					break;
			}
		}
	}
	if (invalids.length!=0){
		console.log(`Invalid${invalids.toString()}`);
		return false;
	}
	return to_return;
}

function filterAllHikes(hikes_list,filters){
	console.log(filters);
	return hikes_list.map(function(hike){
		hike.show=filterHike(hike,filters);
		return hike;
	});
}

export {filterHike, filterAllHikes}