import { Row, Col } from "react-bootstrap";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMountain,
	faPersonWalking,
	faFlag,
	faClock
} from "@fortawesome/free-solid-svg-icons";
import { timeText } from "../HikeData";

export function HikeStats(props) {
	return (
		<>
			<Row>
				<Col>
					<FontAwesomeIcon icon={faPersonWalking} />{" "}
					{(props.hike.length / 1000).toFixed(2)}
					{" Km"}
				</Col>
				<Col>
					<FontAwesomeIcon icon={faMountain} /> {props.hike.ascent}
					{" m"}
				</Col>
			</Row>
			<Row className="bottom-row">
				<Col>
					<FontAwesomeIcon icon={faFlag} /> {props.hike.difficulty}
				</Col>
				<Col>
					<FontAwesomeIcon icon={faClock} /> {timeText(props.hike.expectedTime)}
				</Col>
			</Row>
		</>
	);
}
