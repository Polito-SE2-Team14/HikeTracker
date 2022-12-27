import { Row, Col } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import {
	MapEvents,
	CircleAreaForm,
	GpsTrackButton,
	SelectPositionButton,
} from "./MapSelectors";
import { HikesInfoMarkers, HikesPointMarkers } from "./MapElements";

const DEFAULT_CENTER = [45.070312, 7.686856];

/**
 * Displays a map with an hike and its reference points
 * @param {Array} height - height in pixel of the map
 * @param {Point[]} markers - markers shown on the map
 * @param {function} onSetArea - function that gets called every time the area is set, takes an {center: [float, float], radius: float} object as parameter
 */
export function AreaSelectMap(props) {
	const [position, setPosition] = useState(DEFAULT_CENTER);
	const [selectPosition, setSelectPosition] = useState(false);
	const [radius, setRadius] = useState(1000);
	const [map, setMap] = useState(null);

	console.log(props.points);

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
				{props.hikes ? <HikesInfoMarkers hikes={props.hikes} /> : false}
						{props.points ? <HikesPointMarkers points={props.points}/> : false}
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