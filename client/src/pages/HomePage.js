import { Container, Row } from "react-bootstrap";
import { Loading } from "../components/Loading";
import { AreaSelectMap, PointSelectMap } from "../components/Map/Maps";

export function HomePage() {
	return (
		<Container>
			<Loading/>
			<Row className="d-flex justify-content-center text-center mt-5">
				Keep waiting and something good may happen!<br/>
				Who knows what you'll find? <br/>
				It could be gold, it could be love <br/>
				it could even be a good home page!<br/>
			</Row>
			<PointSelectMap onSetPoint={(point) => {console.log(point)}}/>
		</Container>
	);
}
