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
	Alert,
} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMountain,
	faPersonWalking,
	faFlag,
	faClock,
	faPlay,
	faStop,
	faTrashCan,
	faPenToSquare,
	faXmark,
	faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { HikeMap } from "../Maps/HikeMap";

import HikeAPI from "../../api/HikeAPI";
import PointAPI from "../../api/PointAPI";
import RoleManagement from "../../class/RoleManagement";
import dayjs from 'dayjs'
// import DateTimePicker from 'react-datetime-picker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";

export function HikeModal(props) {
	let hike = props.hike;
	let show = props.show;

	const [markers, setMarkers] = useState({
		start: null,
		end: null,
		referencePoints: [],
		linkedHuts: []
	});
	const [track, setTrack] = useState([]);

	return (
		<Modal show={props.show} onHide={props.onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{hike.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{RoleManagement.isHiker(props.user) && props.thisHikeIsStarted &&
					<Row>
						<Col>
							<Alert key="info" variant="info" className="text-center">
								Hike is in progress ...
							</Alert>
						</Col>
					</Row>
				}
				<Tabs
					defaultActiveKey={
						props.user ? "map" : "info"
					}
				>
					<Tab eventKey="info" title="Info">
						<InfoTab
							show={show}
							user={props.user}
							hike={hike}
							markers={markers}
							thisHikeIsStarted={props.thisHikeIsStarted}
							otherHikeIsStarted={props.otherHikeIsStarted}
							userRecord={props.userRecord}
							customDateTime={props.customDateTime}
							setCustomDateTime={props.setCustomDateTime}
						/>
					</Tab>
					<Tab eventKey="map" title="Map">
						{props.user ? (
							<MapTab
								show={show}
								user={props.user}
								hike={hike}
								markers={markers}
								setMarkers={setMarkers}
								track={track}
								setTrack={setTrack}
							/>
						) : (
							<Row className="d-flex justify-content-center mt-5 mb-3">
								{!props.user ? "Log in to see the map!" : "You are not authorized to see the map!"}
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
							{RoleManagement.isAuthor(props.user, props.hike.creatorID) ? <Button variant="danger" onClick={props.onDelete}>
								<FontAwesomeIcon icon={faTrashCan} /> Delete
							</Button> : false}
						</Col>
						<Col className="d-flex justify-content-end">
							{RoleManagement.isAuthor(props.user, props.hike.creatorID) ? <Button className="me-1" variant="warning" onClick={props.onEdit}>
								<FontAwesomeIcon icon={faPenToSquare} /> Edit
							</Button> : false}
							{RoleManagement.isHiker(props.user) && !props.thisHikeIsStarted && !props.otherHikeIsStarted &&
								<Button variant="success" onClick={props.handleStartHike}>
									<FontAwesomeIcon icon={faPlay} />{" Start"}
								</Button>
							}
							{RoleManagement.isHiker(props.user) && props.thisHikeIsStarted &&
								<Button variant="danger" onClick={props.handleStopHike}>
									<FontAwesomeIcon icon={faStop} />{" Stop"}
								</Button>
							}
						</Col>
					</Row>
				</Col>
			</Modal.Footer>
		</Modal>
	);
}

function InfoTab(props) {
	const [image, setImage] = useState('');

	let hike = props.hike;
	let minDateTime = props.userRecord && props.userRecord.length > 0 ? dayjs(props.userRecord[0].startDate) : dayjs();
	let selectCustomDateTime = function(newValue){props.setCustomDateTime(newValue)}
	let render=function(params){return(<TextField {...params} />)}

	useEffect(() => {
		const getImage = async () => {
			let newImage = await HikeAPI.getImage(props.hike.hikeID);

			setImage(newImage);
		};

		getImage();
	}, [props.hike.hikeID]);

	return (
		<Container>
			<img
				src={image}
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
			{
				props.markers.start && props.markers.end && (
					<Row className="mt-3">
						{props.markers.start && (
							<Col>
								<strong>Start Point:</strong>
								{props.markers.start.name}
							</Col>
						)}
						{props.markers.end && (
							<Col>
								<strong>End Point:</strong>
								{props.markers.end.name}
							</Col>
						)}
					</Row>
				)
			}
			<Row className="mt-3">
				<Col>
					<FontAwesomeIcon icon={faQuoteLeft} size="xl" /> {hike.description}
				</Col>
				<Col>{`by ${hike.creatorName} ${hike.creatorSurname}`}</Col>
			</Row>

			{RoleManagement.isHiker(props.user) && props.thisHikeIsStarted &&
				<Row className="text-center" style={{ marginTop: '10px' }}>
					<Col>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateTimePicker
								label="Manual Clock"
								renderInput={render}
								value={props.customDateTime}
								onChange={selectCustomDateTime}
								minDateTime={minDateTime}
							/>
						</LocalizationProvider>
						{/* <DateTimePicker onChange={props.setCustomDateTime} value={props.customDateTime} /> */}
					</Col>
				</Row>
			}
		</Container >
	);
}

function MapTab(props) {
	let show = props.show;

	const [showForm, setShowForm] = useState(false);
	const [coords, setCoords] = useState([]);

	const updatePath = async () => {
		let newTrack = await HikeAPI.getHikeTrack(props.hike.hikeID);
		props.setTrack(newTrack);
	};

	let getMarkers = async () => {
		let start = await PointAPI.getPoint(props.hike.startPointID);
		let end = await PointAPI.getPoint(props.hike.endPointID);

		let referencePoints = await HikeAPI.getHikePoints(props.hike.hikeID);
		let linkedHuts = await HikeAPI.getLinkedHuts(props.hike.hikeID);
		let huts = await HikeAPI.getCloseHuts(props.hike.hikeID)
			.then(h => h.filter(p => linkedHuts.includes(p.pointID)));

		props.setMarkers({
			start: start ? {
				pointID: start.pointID,
				name: start.name,
				latitude: start.lat,
				longitude: start.lon
			} : null,
			end: end ? {
				pointID: end.pointID,
				name: end.name,
				latitude: end.lat,
				longitude: end.lon
			} : null,
			referencePoints: referencePoints,
			linkedHuts: huts
		});
	};

	useEffect(() => {
		if (show) {
			updatePath();
			getMarkers();
		}
		// eslint-disable-next-line
	}, [show]);

	let onPointSelect = function(coords){
		setCoords(coords);
		setShowForm(true);
	};

	let onPointDeselect =function(){
		getMarkers();
		setShowForm(false);
	};

	return (
		<Container>
			<Row>
				<HikeMap
					editable
					user={props.user}
					track={props.track}
					markers={props.markers}
					onPointSelect={onPointSelect}
					onPointDeselect={onPointDeselect}
				/>
				{RoleManagement.isLocalGuide(props.user) ? <span className="text-muted">
					Insert a reference point by clicking on the track
				</span> : false}
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
							return <ReferencePointInfo key={p.name} point={p} />;
						})}
					</ListGroup>
				</Col>
				<Col>
					<h5>Huts</h5>
					{props.markers.linkedHuts.map((p, i) => {
						return <ReferencePointInfo key={p.name} point={p} />;
					})}
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

	let handleSubmit = function(ev){
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
	let selectName = function(ev){setName(ev.target.value)}
	let selectDescription = function(ev){setDescription(ev.target.value)}
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
							onChange={selectName}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<Form.Control
							as="textarea"
							placeholder="Enter a description"
							value={description}
							onChange={selectDescription}
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
