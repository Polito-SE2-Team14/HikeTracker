import {
	Col, Row,
	Button,
	Form,
	InputGroup,
	Modal
} from "react-bootstrap";

export function HutCreationModal(props) {
	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Hut Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<HutCreationForm handleCreate={props.handleCreate} />
			</Modal.Body>
		</Modal>
	);
}
function HutCreationForm(props) {
	return (
		<Form>
			<Form.Group controlId="formTitle" className="mb-3">
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" />
			</Form.Group>

			<Row>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Latitude</Form.Label>
						<Form.Control type="number" />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Longitude</Form.Label>
						<Form.Control type="number" />
					</Form.Group>
				</Col>
			</Row>

			<Form.Group className="mb-3">
				<Form.Label>Address</Form.Label>
				<Form.Control type="text" />
			</Form.Group>
			<Row>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Bedspace</Form.Label>
						<Form.Control type="number" />
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>HutOwnerID</Form.Label>
						<Form.Control type="number" />
					</Form.Group>
				</Col>
			</Row>
			<InputGroup>
				<Button onClick={() => props.handleCreate()}></Button>
			</InputGroup>
		</Form>
	);
}
