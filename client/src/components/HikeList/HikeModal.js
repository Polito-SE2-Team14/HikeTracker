import { Modal, Button, Row, Col } from "react-bootstrap";
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

export function HikeModal(props) {
	let hike = props.hike;
	let show = props.show;

	const [track, setTrack] = useState([]);
	const [markers, setMarkers] = useState([]);

	const updatePath = async () => {
		if (show) {
			let newTrack = await HikeAPI.getHikeTrack(props.hike.hikeID);
			setTrack(newTrack);
		}
	}

	// TODO(antonio): fix field in the database
	let getMarkers = async () => {
		//let start = await PointAPI.getPoint(hike.startPointID);
		//let end = await PointAPI.getPoint(hike.endPointID);


		setMarkers([,]);
	};

	useEffect(() => {
		updatePath();
		getMarkers();
		// eslint-disable-next-line
	}, [show])

	return props.hike ? (
		<Modal show={props.show} onHide={props.onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{hike.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<HikeMap track={track} markers={markers} />
				<p className="text-muted mt-0">submitted by x/you</p>
				<Row xs={1} md={2} className="d-flex align-items-top mt-2">
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
						<strong>{" Expected time:"}</strong>
						{` ${hike.expectedTime} minutes`}
					</Col>

				</Row>
				<Row className="mt-3">
					<Col>
						{`by ${hike.creatorSurname} ${hike.creatorName} `}
					</Col>
					<Col>
						<FontAwesomeIcon icon={faQuoteLeft} size="xl" /> {hike.description}
					</Col>
					<Col>start and end point</Col>
				</Row>
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
	) : (
		false
	);
}
