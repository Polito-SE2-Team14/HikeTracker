import { Button, Container, Row, Col, Spinner } from "react-bootstrap";
import {
	MapContainer,
	TileLayer,
	Marker,
	Circle,
	useMapEvents,
	Popup,
} from "react-leaflet";
import { getLatLon } from "../HikeData";
import { HikeMarker, HikePath, TrackMarker } from "./MapElements";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faUpDownLeftRight,
} from "@fortawesome/free-solid-svg-icons";
import RoleManagement from "../../class/RoleManagement";
import Slider from "@mui/material/Slider";

import { Loading } from "../Loading";

// TODO(antonio): documentation once the function is implemented
export function HikeMap(props) {
	let track = props.track;

	const [selectedPosition, setSelectedPosition] = useState(undefined);

	const handleAddInfo = () => {
		props.onPointSelect(selectedPosition);
	};

	let displayMap = useMemo(() => {
		if (track.length === 0) {
			return <Loading />;
		} else {
			return (
				<MapContainer
					center={track[Math.round(track.length / 2)]}
					zoom={13}
					scrollWheelZoom={false}
				>
					<TileLayer
						attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> |
								Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
						url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
					/>
					{props.markers.start ? (
						<HikeMarker point={props.markers.start} />
					) : (
						<TrackMarker position={track[0]} start />
					)}
					{props.markers.end ? (
						<HikeMarker point={props.markers.end} />
					) : (
						<TrackMarker position={track[track.length - 1]} />
					)}
					{props.markers.referencePoints.length > 0
						? props.markers.referencePoints.map((p, i) => (
								<HikeMarker key={i} point={p} />
						  ))
						: false}
					<HikePath
						positions={track}
						canAddPoints={RoleManagement.isLocalGuide(props.user.userType)}
						handleAddInfo={handleAddInfo}
					/>
					{props.user && RoleManagement.isLocalGuide(props.user.userType) ? (
						<HikePointSelector
							setSelectedPosition={setSelectedPosition}
							onPointDeselect={props.onPointDeselect}
						/>
					) : (
						false
					)}
				</MapContainer>
			);
		}
	}, [track, props.markers, selectedPosition]);

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

function HikePointSelector(props) {
	useMapEvents({
		popupopen(e) {
			let coords = e.popup.getLatLng();
			props.setSelectedPosition([coords.lat.toFixed(6), coords.lng.toFixed(6)]);
		},
		popupclose(e) {
			props.onPointDeselect();
		},
	});

	return false;
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
				{
					//TODO(antonio) add hikes that include this track
				}
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
			<Row>
				<Col>
					{map ? (
						<>
							<Row className="mb-1">
								<Col xs={7}>
									<CircleAreaForm radius={radius} setRadius={setRadius} />
								</Col>
								<Col className="d-flex align-items-center justify-content-end">
									{`${(radius / 1000).toFixed(1)} Km`}
								</Col>
							</Row>
						</>
					) : (
						false
					)}
				</Col>
			</Row>
			<Row className="mb-2">{displayMap}</Row>
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
		<Slider
			min={500}
			max={10000}
			step={500}
			value={props.radius}
			onChange={(ev) => props.setRadius(ev.target.value)}
		/>
	);
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
