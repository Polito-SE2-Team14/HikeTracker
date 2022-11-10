import { MapContainer, TileLayer } from "react-leaflet";
import { getTestData } from "../testData";
import { HikeMarker, HikePath } from "./MapElements";

// TODO: documentation
/**
 * documentation
 * @param props.
 * @param props.
 * @param props.
 * @returns
 */
export function HikeMap(props) {
	// extract info from props.hike
	// hike.hikeID, hike.title, hike.length, hike.Ascent, hike.Difficulty hike.startPointID, hike.endPointID, hike.description
	// get info from start, end and reference points
	// let startPoint = API.getPoint(hike.startPointID)
	// let endPoint = API.getPoint(hike.endPointID)
	// 
	// let points = API.getHikePoints(hike.hikeID);

	let points = getTestData(); // TEST

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
				center={points[points.length / 2]}
				zoom={13}
				scrollWheelZoom={false}
			>
				{/*TODO: change attribution*/}
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
				/>
				<HikeMarker position={points[0]} />
				{/*getLatLon(point[0])*/}
				<HikeMarker position={points[points.length - 1]} />
				{/*getLatLon(point[points.length-1])*/}
				<HikePath pointPositions={points} />
				{/*getPointsLatLon(points)*/}
			</MapContainer>
		</>
	);
}

// TODO: AreaSelectMap, PointSelectMap

export function AreaSelectMap(props){
	// props.setArea({center: [float, float], radius: float})

}

export function PointSelectMap(props){
	// props.setPoint({point: [float, float])
}


