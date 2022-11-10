import { MapContainer, TileLayer } from "react-leaflet";
import { getTestData } from "../testData";
import { HikeMarker, HikePath } from "./MapElements";

/**
 * documentation
 * @param props.
 * @param props.
 * @param props.
 * @returns
 */
export function HikeMap(props) {
	// estrarre info da props.hike
	// hike.title, hike.startPointID, hike.endPointID, hike.referencePointIDs
	// ottenere info da start, end e reference points
	// let startPoint = API.getPointData(hike.startPointID)
	// let endPoint = API.getPointData(hike.endPointID)
	// let points = hike.referencePointIDs.map((id) => API.getPointData(id));

	let testData = getTestData(); // GPX format

	let points = testData.tracks[0].points.map((p) => [p.lat, p.lon]);
	console.log(props.heigth);

	//TODO: getLatLon() function to pass position to MapContainer center
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
				{/*TODO: cambiare attribution*/}
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
				/>
				<HikeMarker position={points[0]} />
				<HikeMarker position={points[points.length - 1]} />
				<HikePath pointPositions={points} />
			</MapContainer>
		</>
	);
}

// TODO: AreaSelectMap, PointSelectMap

export function AreaSelectMap(props){

}

export function PointSelectMap(props){

}


