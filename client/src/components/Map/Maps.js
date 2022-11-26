import {
	Button,
	Container,
	Row,
	Col,
	Spinner,
	Form,
	InputGroup,
} from "react-bootstrap";
import {
	MapContainer,
	TileLayer,
	Marker,
	Circle,
	useMapEvents,
} from "react-leaflet";
import { getTestData } from "../../testData";
import { getLatLon } from "../HikeData";
import { HikeMarker, HikePath, TrackMarker } from "./MapElements";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faUpDownLeftRight,
} from "@fortawesome/free-solid-svg-icons";

// TODO(antonio): documentation once the function is implemented
export function HikeMap(props) {
	// TODO(antonio):
	// extract info from props.hike
	// hike.hikeID, hike.title, hike.length, hike.Ascent, hike.Difficulty hike.startPointID, hike.endPointID, hike.description
	// get info from start, end and reference points
	// let startPoint = API.getPoint(hike.startPointID)
	// let endPoint = API.getPoint(hike.endPointID)
	//
	// let points = API.getHikePoints(hike.hikeID);
	// OR 		  = props.points;

	// eslint-disable-next-line
	let [hike, points] = getTestData(); // TEST
	let track = props.track;

	let displayMap = useMemo(() => {
		if (track.length === 0) {
			return "loading..."; // TODO(antonio): put loading animation
		} else{
			return (
				<MapContainer center={track[Math.round(track.length/2)]} zoom={13} scrollWheelZoom={false}>
					<TileLayer
						attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> |
								Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
						url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
					/>
					<TrackMarker position={track[0]} start/>
					<TrackMarker position={track[track.length - 1]}/>
					<HikePath positions={track} />
				</MapContainer>
			);}
	}, [track]);

	return (
		<>
			<style>
				{`
               .leaflet-container {
                  height: ${props.height};
               }
            `}
			</style>
			{displayMap}
		</>
	);
}

export function LocationMap(props) {
	return (
		<>
			<style>
				{`
               .leaflet-container {
                  height: ${props.heigth};
               }
            `}
			</style>
			<MapContainer
				center={getLatLon(props.point)}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> |
								Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
				/>
				<HikeMarker point={props.point} />
				{/*TODO(antonio) add hikes that include this track*/}
			</MapContainer>
		</>
	);
}

const DEFAULT_CENTER = [45.070312, 7.686856];
export function AreaSelectMap(props) {
	const [position, setPosition] = useState(DEFAULT_CENTER);
	const [selectPosition, setSelectPosition] = useState(false);
	const [radius, setRadius] = useState(1000);
	const [map, setMap] = useState(null);

	const displayMap = useMemo(() => {
		return (
			<MapContainer
				center={DEFAULT_CENTER}
				zoom={13}
				scrollWheelZoom={false}
				ref={setMap}
			>
				<TileLayer
					attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> |
								Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
				/>
				{selectPosition ? (
					<MapEvents
						setPosition={setPosition}
						setSelectPosition={setSelectPosition}
					/>
				) : (
					<>
						<Marker position={position} />
						<Circle center={position} radius={radius} />
					</>
				)}
			</MapContainer>
		);
	}, [position, radius, selectPosition]);

	// NOTE(antonio): calls the function every time the area is updated
	useEffect(() => {
		if (props.onSetArea) props.onSetArea({ center: position, radius: radius });
		// eslint-disable-next-line
	}, [position, radius]);

	return (
		<>
			<style>
				{`
               .leaflet-container {
                  height: ${props.heigth};
               }
            `}
			</style>
			<Container>
				<Row>
					<Col>
						{map ? (
							<>
								<Row xs={2} className="d-flex align-items-end mb-2">
									<Col>
										<Row>
											<Col className="d-flex justify-content-center">
												<GpsTrackButton map={map} setPosition={setPosition} />
											</Col>
											<Col className="d-flex justify-content-center">
												<SelectPositionButton
													map={map}
													selectPosition={selectPosition}
													setSelectPosition={setSelectPosition}
												/>
											</Col>
										</Row>
									</Col>
									<Col>
										<CircleAreaForm radius={radius} setRadius={setRadius} />
									</Col>
								</Row>
							</>
						) : (
							false
						)}
					</Col>
				</Row>
				<Row className="mb-2">{displayMap}</Row>
			</Container>
		</>
	);
}

function MapEvents(props) {
	useMapEvents({
		click(e) {
			props.setSelectPosition(false);
			props.setPosition([
				parseFloat(e.latlng.lat.toFixed(6)),
				parseFloat(e.latlng.lng.toFixed(6)),
			]);
		},
	});

	return false;
}

function GpsTrackButton(props) {
	const [loading, setLoading] = useState(false);

	const map = props.map;
	const setPosition = props.setPosition;

	const onClick = useCallback(() => {
		setLoading(true);
		map.locate().on("locationfound", (e) => {
			setLoading(false);
			setPosition([
				parseFloat(e.latlng.lat.toFixed(6)),
				parseFloat(e.latlng.lng.toFixed(6)),
			]);
			map.flyTo(e.latlng, map.getZoom());
		});
		// eslint-disable-next-line
	}, [map]);

	return (
		<Button disabled={loading} onClick={onClick}>
			{loading ? (
				<Spinner animation="border" size="sm" />
			) : (
				<FontAwesomeIcon icon={faLocationDot} />
			)}{" "}
			My Location
		</Button>
	);
}

function CircleAreaForm(props) {
	return (
		<Row className="d-flex align-items-center" xs={1}>
			<Col>
				<Form.Group>
					<Form.Range
						value={valueToSlider(props.radius)}
						onChange={(e) => props.setRadius(sliderToValue(e.target.value))}
					/>
				</Form.Group>
			</Col>
			<Col>
				<Form.Group>
					{/*TODO(antonio): validation on numbers*/}
					<InputGroup>
						<InputGroup.Text>Km</InputGroup.Text>
						<Form.Control
							type="number"
							value={props.radius === "" ? "" : props.radius / 1000}
							onChange={(e) => {
								e.target.value === ""
									? props.setRadius("")
									: props.setRadius(e.target.value * 1000);
							}}
						/>
					</InputGroup>
				</Form.Group>
			</Col>
		</Row>
	);
}

// NOTE(antonio): range of slider in the form goes from 0 to 100, while value numbers go from 500 to 10000
// conversion formula is just basic math-- m = (10000-500)/(100-0), value= 5000 + m*input
function sliderToValue(input) {
	input -= input % 10; //NOTE(antonio): rounding to nearest 10s, for precise value use text input

	const m = 95.0;

	return 500 + m * input;
}

function valueToSlider(value) {
	// TODO(antonio): clamp value

	const m = 95.0;

	return (value - 500) / m;
}

function SelectPositionButton(props) {
	return (
		<Button
			variant="warning"
			disabled={props.selectPosition}
			onClick={() => props.setSelectPosition(true)}
		>
			{props.selectPosition ? (
				"Select on map"
			) : (
				<>
					<FontAwesomeIcon icon={faUpDownLeftRight} />
					{" Move marker"}
				</>
			)}
		</Button>
	);
}

export function PointSelectMap(props) {
	const [position, setPosition] = useState(DEFAULT_CENTER);
	const [selectPosition, setSelectPosition] = useState(false);
	const [map, setMap] = useState(null);

	const displayMap = useMemo(() => {
		return (
			<MapContainer
				center={DEFAULT_CENTER}
				zoom={13}
				scrollWheelZoom={false}
				ref={setMap}
			>
				<TileLayer
					attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> |
								Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
					url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
				/>
				{selectPosition ? (
					<MapEvents
						setPosition={setPosition}
						setSelectPosition={setSelectPosition}
					/>
				) : (
					<>
						<Marker position={position} />
					</>
				)}
			</MapContainer>
		);
	}, [position, selectPosition]);

	// NOTE(antonio): calls the function every time the area is updated
	useEffect(() => {
		if (props.onSetPoint) props.onSetPoint(position);
		// eslint-disable-next-line
	}, [position]);

	return (
		<>
			<style>
				{`
               .leaflet-container {
                  height: ${props.heigth};
               }
            `}
			</style>
			<Container>
				<Row>
					<Col>
						{map ? (
							<>
								<Row xs={2} className="d-flex align-items-end mb-2">
									<Col>
										<Row>
											<Col className="d-flex justify-content-center">
												<GpsTrackButton map={map} setPosition={setPosition} />
											</Col>
											<Col className="d-flex justify-content-center">
												<SelectPositionButton
													map={map}
													selectPosition={selectPosition}
													setSelectPosition={setSelectPosition}
												/>
											</Col>
										</Row>
									</Col>
									<Col>
										<strong>Latitude: </strong>
										{position[0]}
										<br />
										<strong>Longitude: </strong>
										{position[1]}
									</Col>
								</Row>
							</>
						) : (
							false
						)}
					</Col>
				</Row>
				<Row className="mb-2">{displayMap}</Row>
			</Container>
		</>
	);
}
