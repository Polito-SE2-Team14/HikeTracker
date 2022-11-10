import { Container } from "react-bootstrap";
import { HikeMap } from "../components/Maps";


export function HomePage() {
	return (
		<>
			<Container>
				Really cool description of services, few links to most popular tracks,
				getting started button etc
			<HikeMap heigth="300px"/>
			</Container>
		</>
	);
}