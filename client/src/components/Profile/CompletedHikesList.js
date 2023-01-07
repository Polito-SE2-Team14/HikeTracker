import { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import HikeAPI from "../../api/HikeAPI";
import HikeRecordsAPI from "../../api/HikeRecordsAPI";
import { Loading } from "../Loading";

export function CompletedHikesList(props) {
	let [hikeRecordList, setHikeRecordList] = useState([]);
	let [loading, setLoading] = useState(true);

	useEffect(() => {
		HikeRecordsAPI.getHikeRecordsForUser(props.user.userID).then((list) => {
			let recordMap = new Map();
			let tempRecordList = new Array();

			list.forEach((record) => {
				if (recordMap.has(record.hikeID)) {
					let oldValue = recordMap.get(record.hikeID);

					recordMap.set(
						record.hikeID,
						oldValue.concat({ start: record.startDate, end: record.endDate })
					);
				} else {
					recordMap.set(record.hikeID, [
						{ start: record.startDate, end: record.endDate },
					]);
				}
			});

			recordMap.forEach((dates, hikeID) => {
				HikeAPI.getHike(hikeID).then((hike) => {
					tempRecordList.push({ ...hike, dates: dates });
				});
			});

			setHikeRecordList(tempRecordList);
			setLoading(false);
		});
	}, []);

	return loading ? (
		<Loading />
	) : (
		<ListGroup variant="flush">
			{hikeRecordList.map((hikeRecord) => (
				<ListGroup.Item key={hikeRecord.hikeID}>aaa</ListGroup.Item>
			))}
		</ListGroup>
	);

	// map list to dict of unique id - array of start/end

	// get info of all hikeID present

	// display map along with basic info

	// display array of start end somehow
}
