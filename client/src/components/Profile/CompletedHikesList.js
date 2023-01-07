import { useEffect, useState } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import HikeAPI from "../../api/HikeAPI";
import HikeRecordsAPI from "../../api/HikeRecordsAPI";
import { Loading } from "../Loading";
import { HikeMap } from "../Maps/HikeMap";

export function CompletedHikesList(props) {
	let [hikeRecordList, setHikeRecordList] = useState([]);
	let [loading, setLoading] = useState(true);

	async function getCompletedHikes() {
		let completedHikesList = await HikeRecordsAPI.getHikeRecordsForUser(
			props.user.userID
		);

		let recordMap = new Map();
		let tempRecordList = new Array();

		completedHikesList.forEach((record) => {
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

		for (const [hikeID, dates] of recordMap) {
			let hike = await HikeAPI.getHike(hikeID);
			let track = await HikeAPI.getHikeTrack(hikeID);
			tempRecordList.push({ ...hike, track: track, dates: dates });
		}

		setHikeRecordList(tempRecordList);
		setLoading(false);
	}

	useEffect(() => {
		getCompletedHikes();
	}, []);

	return loading ? (
		<Loading />
	) : (
		<ListGroup variant="flush" className="mt-2">
			{hikeRecordList.map((hikeRecord) => (
				<ListGroup.Item key={hikeRecord.hikeID}>
					<h3>{hikeRecord.title}</h3>
					<Row>
						<Col xs={3}>
						<HikeMap height="280px" track={hikeRecord.track} markers={{}} user={props.user}/>
						</Col>
						<Col>
						less go baby <br/>
						remember responsiveness <br/>
						all the stats available <br/>
						start time and duration of each time <br/>
						Completed times = {hikeRecord.dates.length}
						</Col>
					</Row>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
}