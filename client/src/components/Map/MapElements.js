import { Container, Row, Button } from "react-bootstrap";
import { Marker, Popup } from "react-leaflet";
import AntPath from "./AntPath";
import { getLatLon } from "../HikeData";

import * as L from "leaflet";
import { faBed, faClipboard, faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
});

let orangeIcon = new L.Icon({
	iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
	shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
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

export function TrackMarker(props) {
	return (
		<Marker
			position={props.position}
			icon={props.start ? goldIcon : orangeIcon}
		/>
	);
}

export function HikePath(props) {
	return (
		<AntPath positions={props.positions} options={{ color: "blue" }}>
			{props.canAddPoints ? (
				<HikePopup handleAddInfo={props.handleAddInfo} />
			) : (
				false
			)}
		</AntPath>
	);
}

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
			<Button onClick={props.handleAddInfo}>
				<FontAwesomeIcon icon={faClipboard} /> Insert Info
			</Button>
		</Popup>
	);
}
