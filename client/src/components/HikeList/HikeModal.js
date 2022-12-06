import { Modal, Button, Row, Col, Tabs, Tab } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMountain,
	faPersonWalking,
	faFlag,
	faClock,
	faPlay,
	faTrashCan,
	faPenToSquare,
	faXmark,
	faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { HikeMap } from "../Map/Maps";

import HikeAPI from "../../api/HikeAPI";
import PointAPI from "../../api/PointAPI";
import RoleManagement from "../../class/RoleManagement";

export function HikeModal(props) {
	let hike = props.hike;
	let show = props.show;

	if (!hike) return false;

	return (
		<Modal show={props.show} onHide={props.onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{hike.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Tabs defaultActiveKey="info">
					<Tab eventKey="info" title="Info">
						<InfoTab show={show} user={props.user} hike={hike} />
					</Tab>
					{RoleManagement.isHiker(props.user.userType) ? <Tab eventKey="map" title="Map">
						<MapTab show={show} user={props.user} hike={hike} />
					</Tab> : false}
				</Tabs>
			</Modal.Body>
			<Modal.Footer>
				<Col>
					<Row xs={2}>
						<Col>
							<Button
								className="me-1"
								variant="secondary"
								onClick={props.onClose}
							>
								<FontAwesomeIcon icon={faXmark} /> Close
							</Button>
							<Button variant="danger" onClick={props.onDelete}>
								<FontAwesomeIcon icon={faTrashCan} /> Delete
							</Button>
						</Col>
						<Col className="d-flex justify-content-end">
							<Button className="me-1" variant="warning" onClick={props.onEdit}>
								<FontAwesomeIcon icon={faPenToSquare} /> Edit
							</Button>{" "}
							<Button variant="success" onClick={props.onStart}>
								<FontAwesomeIcon icon={faPlay} /> Start
							</Button>
						</Col>
					</Row>
				</Col>
			</Modal.Footer>
		</Modal>
	);
}

function InfoTab(props) {
	let hike = props.hike;

	return (
		<>
			<Row xs={1} md={2} className="d-flex align-items-top mt-4">
				<Col>
					<FontAwesomeIcon icon={faPersonWalking} />
					<strong>{" Distance:"}</strong>
					{` ${hike.length} meters`}
				</Col>
				<Col>
					<FontAwesomeIcon icon={faMountain} />
					<strong>{"  Ascent:"}</strong>
					{` ${hike.ascent} meters`}
				</Col>
				<Col>
					<FontAwesomeIcon icon={faFlag} />
					<strong>{" Difficulty:"}</strong>
					{` ${hike.difficulty}`}
				</Col>
				<Col>
					<FontAwesomeIcon icon={faClock} />
					<strong>{" Time:"}</strong>
					{` ${hike.expectedTime} minutes`}
				</Col>
			</Row>
			{/* {markers.start && markers.end && ( //TODO(antonio): fix when map is visible
				<Row className="mt-3">
					{markers.start && (
						<Col>
							<strong>Start Point:</strong>
							{markers.start}
						</Col>
					)}
					{markers.end && (
						<Col>
							<strong>End Point:</strong>
							{markers.end}
						</Col>
					)}
				</Row>
			)} */}
			<Row className="mt-3">
				<Col>
					<FontAwesomeIcon icon={faQuoteLeft} size="xl" /> {hike.description}
				</Col>
				<Col>{`by ${hike.creatorSurname} ${hike.creatorName} `}</Col>
			</Row>
		</>
	);
}

function MapTab(props) {
	let show = props.show;

	const [track, setTrack] = useState([]);
	const [markers, setMarkers] = useState([]);

	const updatePath = async () => {
		if (show) {
			let newTrack = await HikeAPI.getHikeTrack(props.hike.hikeID);
			setTrack(newTrack);
		}
	};

	// TODO(antonio): fix field in the database, refactor marker system
	let getMarkers = async () => {
		let start = await PointAPI.getPoint(props.hike.startPointID);
		let end = await PointAPI.getPoint(props.hike.endPointID);

		setMarkers({ start: start, end: end });
	};

	useEffect(() => {
		if (show) {
			updatePath();
			getMarkers();
		}
		// eslint-disable-next-line
	}, [show]);

	return (
		<HikeMap
			user={props.user}
			track={track}
			//markers={markers}
		/>
	);
}
