import { useEffect, useState } from "react";
import HikeRecordsAPI from "../../api/HikeRecordsAPI";

export function CompletedHikesList(props) {
	//let [recordList, setRecordList] = useState([]);

	let [recordMap, setRecordMap] = useState(new Map());

	useEffect(() => {
		HikeRecordsAPI.getHikeRecordsForUser(props.user.userID).then((list) => {
			let tempRecordMap = new Map();
			
			list.forEach((record) => {
				if(tempRecordMap.has(record.hikeID)){
					let oldValue = tempRecordMap.get(record.hikeID);

					tempRecordMap.set(record.hikeID, oldValue.concat({start: record.start, end: record.end}));
				} else {
					tempRecordMap.set(record.hikeID, [{start: record.start, end: record.end}])
				}
			})

			setRecordMap(tempRecordMap);
			console.log(tempRecordMap);

			
		});
	}, []);
	
	// map list to dict of unique id - array of start/end

	// get info of all hikeID present

	// display map along with basic info

	// display array of start end somehow

}
