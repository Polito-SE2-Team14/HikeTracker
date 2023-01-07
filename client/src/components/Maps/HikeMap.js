import {
	MapContainer,
	TileLayer
} from "react-leaflet";
import { PointMarker, HikePath, TrackMarker } from "./MapElements";
import { useMemo, useState } from "react";
import RoleManagement from "../../class/RoleManagement";
import { Loading } from "../Loading";
import { HikePointSelector } from "./MapSelectors";

/**
 * Displays a map with an hike and its associated points
 * @param {Array} height - height in pixel of the map
 * @param {Array} track - list of coordinates that make up the track
 * @param {Object[]} markers - list of {start, end, linkedHuts, referencePoints} associated with the hike
 * @param {Point} markers.start - start point of the hike
 * @param {Point} markers.end - end point of the hike
 * @param {[Point]} markers.linkedHuts - huts linked to the hike
 * @param {[Point]} markers.referencePoints - reference points on the hike
 * @param {boolean} editable - turns on the add point functionality
 * @param {user} user the current user
 */
export function HikeMap(props) {
	let track = props.track;

	const [selectedPosition, setSelectedPosition] = useState(undefined);

	let handleAddInfo = function() {
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
						url="https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png" />
					{props.markers.start ? (
						<PointMarker point={props.markers.start} />
					) : (
						<TrackMarker position={track[0]} start />
					)}
					{props.markers.end ? (
						<PointMarker point={props.markers.end} />
					) : (
						<TrackMarker position={track[track.length - 1]} />
					)}
					{props.markers.referencePoints && props.markers.referencePoints.length > 0
						? props.markers.referencePoints.map((p) => (
							<PointMarker key={p.pointID} point={p} />
						))
						: false}
					{props.markers.linkedHuts && props.markers.linkedHuts.length > 0
						&& props.markers.linkedHuts.map((p) => (
							<PointMarker key={p.pointID} point={p} />
						))}
					<HikePath
						positions={track}
						canAddPoints={props.editable && RoleManagement.isLocalGuide(props.user)}
						handleAddInfo={handleAddInfo} />
					{RoleManagement.isLocalGuide(props.user) ? (
						<HikePointSelector
							setSelectedPosition={setSelectedPosition}
							onPointDeselect={props.onPointDeselect} />
					) : (
						false
					)}
				</MapContainer>
			);
		}
		// eslint-disable-next-line
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
