import { MapContainer, TileLayer } from "react-leaflet";
import { getTestData } from "../../testData";
import { getLatLon, getPointsLatLon } from "../HikeData";
import { HikeMarker, HikePath } from "./MapElements";

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

	let [hike, points] = getTestData(); // TEST

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
				center={getLatLon(points[points.length / 2])}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> |
								Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
				/>
				<HikeMarker point={points[0]} />
				{/*getLatLon(point[0])*/}
				<HikeMarker point={points[points.length - 1]} />
				{/*getLatLon(point[points.length-1])*/}
				<HikePath positions={getPointsLatLon(points)} />
				{/*getPointsLatLon(points)*/}
			</MapContainer>
		</>
	);
}

// TODO(antonio): AreaSelectMap, PointSelectMap

export function AreaSelectMap(props) {
	// props.setArea({center: [float, float], radius: float})
}

export function PointSelectMap(props) {
	// props.setPoint({point: [float, float])
}
