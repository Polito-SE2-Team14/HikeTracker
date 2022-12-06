import { Container, Row } from "react-bootstrap";
import { Marker, Popup } from "react-leaflet";
import AntPath from "./AntPath";
import { getLatLon } from "../HikeData";

import "../../styles/MapElements.css";

import * as L from "leaflet";
import { faBed, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

/* var startflagIcon = new L.Icon({
	iconUrl: "https://poeknows.com/wp-content/uploads/2015/07/red-flag.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

var endFlagIcon = new L.Icon({
	iconUrl:
		"https://cdn1.iconfinder.com/data/icons/car-racing-cartoon/512/g1407-512.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
}); */

// TODO(antonio): proper documentation
export function HikeMarker(props) {
	let position = getLatLon(props.point);
	let popup, icon;
	switch (props.point.pointType) {
		case "generic":
			popup = <PointPopup point={props.point} />;
			icon = greenIcon;
			break;
		case "hut":
			popup = <HutPopup hut={props.point} />;
			icon = redIcon;
			break;
		case "parkinglot":
			popup = <ParkingLotPopup parkingLot={props.point} />;
			icon = blueIcon;
			break;
		default:
			// TODO(antonio): error handling
			break;
	}

	return (
		<Marker position={position} icon={icon}>
			{popup}
		</Marker>
	);
}

export function TrackMarker(props) {
	return (
		<Marker
			position={props.position}
			icon={props.start ? redIcon : greenIcon}
		/>
	);
}

// TODO(antonio): proper documentation
export function HikePath(props) {
	// TODO(antonio):props.expectedtime, length, ascent display on popup, difficulty is color (green, red, blue)
	return (
		<AntPath positions={props.positions} options={{ color: "blue" }}>
			<HikePopup />
		</AntPath>
	);
}

// TODO(antonio): proper documentation
function PointPopup(props) {
	let position = getLatLon(props.point);

	return (
		<Popup>
			<Container fluid>
				<Row>{`(${position[0]}, ${position[1]})`}</Row>
			</Container>
		</Popup>
	);
}

// TODO(antonio): proper documentation
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

// TODO(antonio): proper documentation
function ParkingLotPopup(props) {
	return (
		<Popup>
			Popup for Parking Lot. <br /> Easily customizable.
		</Popup>
	);
}

// TODO(antonio): proper documentation
function HikePopup(props) {
	return (
		<Popup>
			Popup for Hike. <br /> Easily customizable.
		</Popup>
	);
}
