import { Container, Row, Col } from "react-bootstrap";
import {
	MapContainer,
	TileLayer,
	Marker
} from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import { MapEvents, GpsTrackButton, SelectPositionButton } from "./MapSelectors";

const DEFAULT_CENTER = [45.070312, 7.686856];

/**
 * Map that allows to select a point
 * @param {int} height - heigth of the map in pixels
 * @param {function} onSetPoint - function that gets called every time the point is set, takes an {latitude: float, longitude: float} object as parameter
 * @returns 
 */
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
					url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png" />
				{selectPosition ? (
					<MapEvents
						setPosition={setPosition}
						setSelectPosition={setSelectPosition} />
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
		if (props.onSetPoint)
			props.onSetPoint(position);
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
													setSelectPosition={setSelectPosition} />
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
