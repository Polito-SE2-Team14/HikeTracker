import { useEffect, useState } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import HikeAPI from "../../api/HikeAPI";
import HikeRecordsAPI from "../../api/HikeRecordsAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMountain,
	faPersonWalking,
	faFlag,
	faClock,
	faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import { Loading } from "../Loading";
import { HikeMap } from "../Maps/HikeMap";

import { timeText } from "../HikeData";

const dayjs = require("dayjs")

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
		<HikeInfoList user={props.user} hikeRecordList={hikeRecordList} />
	);
}

function HikeInfoList(props) {
	return props.hikeRecordList.length === 0 ? (
		<Row className="text-secondary mt-5">
			No activity recorded: take your mountain boots and go somewhere!{" "}
		</Row>
	) : (
		<ListGroup variant="flush" className="mt-2">
			{props.hikeRecordList.map((hikeRecord) => (
				<ListGroup.Item key={hikeRecord.hikeID}>
					<h3>{hikeRecord.title}</h3>
					<Row>
						<Col md={12} lg={6}>
							<HikeMap
								track={hikeRecord.track}
								markers={{}}
								user={props.user}
							/>
							<span className="text-muted">{`${hikeRecord.municipality} (${hikeRecord.province}, ${hikeRecord.country})`}</span>
						</Col>
						<Col>
							<Row className="mt-3">
								<Col>
									<FontAwesomeIcon icon={faPersonWalking} />
									{" Distance: "}
									{(hikeRecord.length / 1000).toFixed(2)}
									{" Km"}
								</Col>
								<Col>
									<FontAwesomeIcon icon={faMountain} /> Ascent:{" "}
									{hikeRecord.ascent}
									{" m"}
								</Col>
							</Row>
							<Row>
								<Col>
									<FontAwesomeIcon icon={faFlag} /> Difficulty:{" "}
									{hikeRecord.difficulty}
								</Col>
								<Col>
									<FontAwesomeIcon icon={faClock} /> Expected time:{" "}
									{timeText(hikeRecord.expectedTime)}
								</Col>
							</Row>
							<hr />
							<FontAwesomeIcon icon={faFlagCheckered} /> Completed{" "}
							{hikeRecord.dates.length} time(s)
							<ul>
								{hikeRecord.dates.map((date) => (
									<li key={date.start}>
										<strong>{date.start}</strong> | Duration: {getDuration(date.start, date.end)}
									</li>
								))}
							</ul>
						</Col>
					</Row>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
}

function getDuration(start, end){
	const date1 = dayjs(start);
	const date2 = dayjs(end);

	return timeText(date2.diff(date1, 'minute'));
}