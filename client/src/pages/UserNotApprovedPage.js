import { Alert, Container, Row } from "react-bootstrap";

export function UserNotApprovedPage(props) {
	return (
		<Container>
			<Row className="d-flex justify-content-center text-center mt-5">
				<Alert key='warning' variant='warning'>
					Your account is not approved. You have to wait for the manager to approve it.
				</Alert>
			</Row>
		</Container>
	);
}
