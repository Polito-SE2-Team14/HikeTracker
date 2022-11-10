import { Col, Container, Row } from "react-bootstrap";
import { HikeMap } from "../components/Maps";

export function HomePage() {
	return (
		<>
			<Container>
				<Row>
					<Col>
						Really cool description of services, few links to most popular
						tracks, getting started button etc
					</Col>
					<Col>
						<HikeMap heigth="300px"/>
					</Col>
				</Row>
			</Container>
		</>
	);
}
