import { Container, Row } from "react-bootstrap";
import { Marker, Popup } from "react-leaflet";
import AntPath from "./AntPath";
import { getLatLon } from "../HikeData";
import { GeoFill } from "react-bootstrap-icons";

import "../../styles/MapElements.css";

// TODO(antonio): proper documentation
export function HikeMarker(props) {
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
			// TODO(antonio): error handling
			break;
	}

	return <Marker position={position}>{popup}</Marker>;
};

// TODO(antonio): proper documentation
export function HikePath(props) {
	// TODO(antonio):props.expectedtime, length, ascent display on popup
	return (
		<AntPath positions={props.positions} options={{ color: "red" }}>
			<HikePopup />
		</AntPath>
	);
};

// TODO(antonio): proper documentation
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
};

// TODO(antonio): proper documentation
function HutPopup(props) {
	return (
		<Popup>
			A pretty CSS3 popup. <br /> Easily customizable.
		</Popup>
	);
};

// TODO(antonio): proper documentation
function ParkingLotPopup(props) {
	return (
		<Popup>
			A pretty CSS3 popup. <br /> Easily customizable.
		</Popup>
	);
};

// TODO(antonio): proper documentation
function HikePopup(props) {
	return (
		<Popup>
			A pretty CSS3 popup. <br /> Easily customizable.
		</Popup>
	);
};
