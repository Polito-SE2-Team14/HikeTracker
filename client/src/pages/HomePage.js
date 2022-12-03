import { Container, Row } from "react-bootstrap";
import { EmptySearch } from "../components/EmptySeach";
import { Loading } from "../components/Loading";
import { AreaSelectMap, PointSelectMap } from "../components/Map/Maps";
import Slider from '@mui/material/Slider';
import { useState } from "react";

export function HomePage() {
	const [distanceValue, setDistanceValue] = useState([0,100]);

	return (
		<Container>
			<Loading/>
			<Row className="d-flex justify-content-center text-center mt-5">
				Keep waiting and something good may happen!<br/>
				Who knows what you'll find? <br/>
				It could be gold, it could be love <br/>
				it could even be a good home page!<br/>
			</Row>
			<EmptySearch/>
		</Container>
	);
}
