import { Container, Row, Button } from "react-bootstrap";
import { Marker, Popup } from "react-leaflet";
import AntPath from "./AntPath";
import { getLatLon, timeText } from "../HikeData";

import * as L from "leaflet";
import {
	faBed,
	faCar,
	faClipboard,
	faMap,
	faPersonWalking,
	faStopwatch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../styles/MapElements.css";

const redIcon = new L.Icon({
	iconUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
	iconUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

let goldIcon = new L.Icon({
	iconUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

let orangeIcon = new L.Icon({
	iconUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
	iconUrl:
		"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
	shadowUrl:
		"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

/**
 * Creates an appropriate point marker based on the type of the point
 * @param {Point} point - Point object
 */
export function PointMarker(props) {
	let position = getLatLon(props.point);
	let popup, icon;
	switch (props.point.pointType) {
		case "generic":
			popup = <PointPopup point={props.point} />;
			icon = blueIcon;
			break;
		case "hut":
			popup = <HutPopup hut={props.point} />;
			icon = redIcon;
			break;
		case "parkinglot":
			popup = <ParkingLotPopup parkingLot={props.point} />;
			icon = greenIcon;
			break;
		default:
			popup = false;
			icon = redIcon;
			break;
	}

	return (
		<Marker position={position} icon={icon}>
			{popup}
		</Marker>
	);
}

/**
 * Creates a list of pointer pased on the starting poistion of each hike
 * @param {Hike[]} hikes - list of hikes
 */
export function HikesInfoMarkers(props) {
	return props.hikes.map((hike) =>
		hike.startPoint ? (
			<Marker key={hike.hikeID} position={getLatLon(hike.startPoint)} icon={redIcon}>
				<HikePopup hike={hike} />
			</Marker>
		) : (
			<Marker key={hike.hikeID} position={hike.track[0]} icon={redIcon}>
				<HikePopup hike={hike} />
			</Marker>
		)
	);
}

/**
 * Creates an appropriate point marker for each point
 * @param {Point[]} point - Point list
 */
export function HikesPointMarkers(props) {
	return props.points.map((point) => <PointMarker key={point.pointID} point={point} />);
}

/**
 * Creates a marker for the start/end position of a track
 * @param {Point} point - Point object
 */
export function TrackMarker(props) {
	return (
		<Marker
			position={props.position}
			icon={props.start ? goldIcon : orangeIcon}
		/>
	);
}

/**
 * Creates an appropriate point marker based on the type of the point
 * @param {[latitude, longitude]} positions - list of coordinates
 * @param {boolean} canAddPoints - enables the creation of reference points on the track
 * @param {function} handleAddInfo - function called when a new reference point is added
 */
export function HikePath(props) {
	return (
		<AntPath positions={props.positions} options={{ color: "blue" }}>
			{props.canAddPoints ? (
				<AddReferencePointPopup handleAddInfo={props.handleAddInfo} />
			) : (
				false
			)}
		</AntPath>
	);
}

/**
 * Generic popup for a point
 * @param {Point} point - Point object
 */
function PointPopup(props) {
	return (
		<Popup>
			<Container fluid>
				<h6>{props.point.name}</h6>
				<Row>{props.point.description}</Row>
			</Container>
		</Popup>
	);
}

/**
 * Popup for an hut
 * @param {Point} hut - Point object
 */
function HutPopup(props) {
	return (
		<Popup>
			<Row className="popup-title">{props.hut.name}</Row>
			<FontAwesomeIcon icon={faMap} /> {props.hut.address}
			<br />
			<FontAwesomeIcon icon={faBed} /> {props.hut.bedspace}
		</Popup>
	);
}

/**
 * Popup for a parking lot
 * @param {Point} parkingLot - Point object
 */
function ParkingLotPopup(props) {
	return (
		<Popup>
			<Row className="popup-title">{props.parkingLot.name}</Row>
			<FontAwesomeIcon icon={faMap} /> {props.parkingLot.address}
			<br />
			<FontAwesomeIcon icon={faCar} /> {props.parkingLot.carspace}
		</Popup>
	);
}

/**
 * Popup for an hike
 * @param {Hike} hike - hike object
 */
function HikePopup(props) {
	return (
		<Popup>
			<Row>{props.hike.title.length > 25 ? props.hike.title.trim().slice(0, 24).concat("...") : props.hike.title}</Row>
			<FontAwesomeIcon icon={faPersonWalking} /> {Math.round(props.hike.length/1000)} Km
			<br />
			<FontAwesomeIcon icon={faStopwatch} /> {timeText(props.hike.expectedTime)}
		</Popup>
	);
}

/**
 * Popup with button to create a reference point
 * @param {function} handleAddInfo - function called when button "Insert info" is pressed
 */
function AddReferencePointPopup(props) {
	return (
		<Popup>
			<Button onClick={props.handleAddInfo}>
				<FontAwesomeIcon icon={faClipboard} /> Insert Info
			</Button>
		</Popup>
	);
}
