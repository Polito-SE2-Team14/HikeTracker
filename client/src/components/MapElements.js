import { Container, Row, Col } from "react-bootstrap";
import { Marker, Popup } from "react-leaflet";
import AntPath from "./AntPath";
import { getLatLon } from "./HikeData";
import { GeoFill } from "react-bootstrap-icons";

import "../styles/MapElements.css";

export function HikeMarker(props) {
	// props.point //TODO: documentation
	let position = getLatLon(props.point);
	let type = "generic"; // props.point.pointType

	let popup;
	switch (type) {
		case "generic":
			popup = <PointPopup point={props.point} />;
			break;
		case "hut":
			popup = <HutPopup />;
			break;
		case "parkingLot":
			popup = <ParkingLotPopup />;
			break;
		default:
			// TODO: error handling
			break;
	}

	return <Marker position={position}>{popup}</Marker>;
}
export function HikePath(props) {
	// props.expectedtime, length, ascent
	return (
		<AntPath positions={props.positions} options={{ color: "red" }}>
			<HikePopup />
		</AntPath>
	);
}
function PointPopup(props) {
	let position = getLatLon(props.point);

	return (
		<Popup>
			<Container fluid>
				<Row>
					{props.point.name ? (
						<span className="popup-title">
							<GeoFill size="18"/>{' '}
							<span>{props.point.name}</span>
						</span>
					) : (
						false
					)}
				</Row>
				<Row>
					{`(${position[0]}, ${position[1]})`}
				</Row>
			</Container>
		</Popup>
	);
}
function HutPopup(props) {
	return (
		<Popup>
			A pretty CSS3 popup. <br /> Easily customizable.
		</Popup>
	);
}
function ParkingLotPopup(props) {
	return (
		<Popup>
			A pretty CSS3 popup. <br /> Easily customizable.
		</Popup>
	);
}
function HikePopup(props) {
	return (
		<Popup>
			A pretty CSS3 popup. <br /> Easily customizable.
		</Popup>
	);
}
