import { Container, Row } from "react-bootstrap";

export function EmptySearch() {
	return (
		<Container className="mt-5">
			<Row className="d-flex justify-content-center text-center">
				Sorry there are no results, <br />
				try changing the filter parameters. <br />
			</Row>
			<Row className="d-flex justify-content-center text-muted mt-2">
				what a picky hiker!
			</Row>
		</Container>
	);
}
