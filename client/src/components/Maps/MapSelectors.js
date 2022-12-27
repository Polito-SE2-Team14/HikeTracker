import { Button, Spinner } from "react-bootstrap";
import { useMapEvents } from "react-leaflet";
import { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLocationDot,
	faUpDownLeftRight
} from "@fortawesome/free-solid-svg-icons";
import Slider from "@mui/material/Slider";

export function MapEvents(props) {
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
export function GpsTrackButton(props) {
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
export function CircleAreaForm(props) {
	return (
		<Slider
			min={500}
			max={10000}
			step={500}
			value={props.radius}
			onChange={(ev) => props.setRadius(ev.target.value)} />
	);
}
export function SelectPositionButton(props) {
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
export function HikePointSelector(props) {
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
