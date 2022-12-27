import {
	MapContainer,
	TileLayer
} from "react-leaflet";
import { getLatLon } from "../HikeData";
import { PointMarker } from "./MapElements";



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
					url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png" />
				<PointMarker point={props.point} />
			</MapContainer>
		</>
	);
}
