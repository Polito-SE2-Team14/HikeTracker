import {
	Modal,
	Button,
	Row,
	Col,
	Tabs,
	Tab,
	Container,
	Form,
	ListGroup,
} from "react-bootstrap";
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

	const [markers, setMarkers] = useState({
		start: null,
		end: null,
		referencePoints: [],
	});

	return (
		<Modal show={props.show} onHide={props.onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{hike.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Tabs
					defaultActiveKey={
						RoleManagement.isHiker(props.user.userType) ? "map" : "info"
					}
				>
					<Tab eventKey="info" title="Info">
						<InfoTab
							show={show}
							user={props.user}
							hike={hike}
							markers={markers}
						/>
					</Tab>
					<Tab eventKey="map" title="Map">
						{RoleManagement.isHiker(props.user.userType) ? (
							<MapTab
								show={show}
								user={props.user}
								hike={hike}
								markers={markers}
								setMarkers={setMarkers}
							/>
						) : (
							<Row className="d-flex justify-content-center mt-5 mb-3">
								{" "}
								Log in to see the map!{" "}
							</Row>
						)}
					</Tab>
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
							{RoleManagement.isAuthor(props.user, props.hike) ? <Button variant="danger" onClick={props.onDelete}>
								<FontAwesomeIcon icon={faTrashCan} /> Delete
							</Button> : false}
						</Col>
						<Col className="d-flex justify-content-end">
							{RoleManagement.isAuthor(props.user, props.hike) ? <Button className="me-1" variant="warning" onClick={props.onEdit}>
								<FontAwesomeIcon icon={faPenToSquare} /> Edit
							</Button> : false}
							{/* <Button variant="success" onClick={props.onStart}>
								<FontAwesomeIcon icon={faPlay} />{" Start"}
							</Button> */}
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
		<Container>
			<img
				src="https://www.rei.com/dam/parrish_091412_0679_main_lg.jpg"
				className="img-fluid mt-4"
				alt="..."
			/>
			<Row>
				<Col>{`${hike.municipality} (${hike.province}, ${hike.country})`}</Col>
			</Row>
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
					<strong>{" Time:"}</strong>
					{` ${hike.expectedTime} minutes`}
				</Col>
			</Row>
			{props.markers.start && props.markers.end && (
				<Row className="mt-3">
					{props.markers.start && (
						<Col>
							<strong>Start Point:</strong>
							{props.markers.start}
						</Col>
					)}
					{props.markers.end && (
						<Col>
							<strong>End Point:</strong>
							{props.markers.end}
						</Col>
					)}
				</Row>
			)}
			<Row className="mt-3">
				<Col>
					<FontAwesomeIcon icon={faQuoteLeft} size="xl" /> {hike.description}
				</Col>
				<Col>{`by ${hike.creatorName} ${hike.creatorSurname}`}</Col>
			</Row>
		</Container>
	);
}

function MapTab(props) {
	let show = props.show;

	const [track, setTrack] = useState([]);

	const [showForm, setShowForm] = useState(false);
	const [coords, setCoords] = useState([]);

	const updatePath = async () => {
		let newTrack = await HikeAPI.getHikeTrack(props.hike.hikeID);
		setTrack(newTrack);
	};

	let getMarkers = async () => {
		let start = await PointAPI.getPoint(props.hike.startPointID);
		let end = await PointAPI.getPoint(props.hike.endPointID);

		let referencePoints = await HikeAPI.getHikePoints(props.hike.hikeID);

		props.setMarkers({
			start: start,
			end: end,
			referencePoints: referencePoints,
		});
	};

	useEffect(() => {
		if (show) {
			updatePath();
			getMarkers();
		}
		// eslint-disable-next-line
	}, [show]);

	const onPointSelect = (coords) => {
		setCoords(coords);
		setShowForm(true);
	};

	const onPointDeselect = () => {
		getMarkers();
		setShowForm(false);
	};

	return (
		<Container>
			<Row>
				<HikeMap
					user={props.user}
					track={track}
					markers={props.markers}
					onPointSelect={onPointSelect}
					onPointDeselect={onPointDeselect}
				/>
				<span className="text-muted">
					Insert a reference point by clicking on the track
				</span>
			</Row>
			{showForm ? (
				<ReferencePointForm
					coords={coords}
					onPointDeselect={onPointDeselect}
					getMarkers={getMarkers}
					user={props.user}
					hike={props.hike}
				/>
			) : (
				false
			)}
			<Row className="mt-3">
				<Col>
					<ListGroup variant="flush">
						<h5>Reference points</h5>
						{props.markers.referencePoints.map((p, i) => {
							return <ReferencePointInfo key={i} point={p} />;
						})}
					</ListGroup>
				</Col>
				<Col>
					<h5>Huts</h5>
				</Col>
			</Row>
		</Container>
	);
}

function ReferencePointInfo(props) {
	return (
		<ListGroup.Item>
			<Row className="d-flex align-items-center">
				<Col>{props.point.name}</Col>
			{/* <Col xs={2}>
					<Button size="sm" variant="danger">
						<FontAwesomeIcon icon={faTrashCan} />
					</Button>
				</Col> */}
			</Row>
		</ListGroup.Item>
	);
}

function ReferencePointForm(props) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const handleSubmit = (ev) => {
		ev.preventDefault();

		let referencePoint = {
			name: name,
			description: description,
			latitude: props.coords[0],
			longitude: props.coords[1],
			altitude: 0,
			country: props.hike.country,
			province: props.hike.province,
			municipality: props.hike.municipality,
			creatorID: props.hike.creatorID,
		};

		HikeAPI.addReferencePoint(referencePoint, props.hike.hikeID);
		props.onPointDeselect();
	};

	return (
		<>
			<Row className="mt-3">
				<h5>New Reference point</h5>
				<h6>Selected coordinates: {props.coords.toString()}</h6>
				<Form>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control
							placeholder="Enter a name"
							value={name}
							onChange={(ev) => setName(ev.target.value)}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="Enter a description"
							value={description}
							onChange={(ev) => setDescription(ev.target.value)}
						/>
					</Form.Group>
					<span className="d-flex justify-content-end mt-3">
						<Button
							className="me-2"
							onClick={props.onPointDeselect}
							variant="secondary"
						>
							Close form
						</Button>
						<Button type="submit" onClick={handleSubmit} variant="success">
							Insert point
						</Button>
					</span>
				</Form>
			</Row>
			<hr />
		</>
	);
}
