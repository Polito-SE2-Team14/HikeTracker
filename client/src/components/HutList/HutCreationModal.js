import { useState } from "react";
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

	const [name, setName] = useState("")
	const [latitude, setLatitude] = useState(0)
	const [longitude, setLongitude] = useState(0)
	const [address, setAddress] = useState("")
	const [bedspace, setBedspace] = useState(0)
	const [hutOwnerID, setHutOwnerID] = useState(0)


	return (
		<Form>
			<Form.Group controlId="formTitle" className="mb-3">
				<Form.Label>Name</Form.Label>
				<Form.Control type="text"
					onChange={(ev) => setName(ev.target.value)}
				/>
			</Form.Group>

			<Row>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Latitude</Form.Label>
						<Form.Control type="number"
							onChange={(ev) => setLatitude(ev.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Longitude</Form.Label>
						<Form.Control type="number"
							onChange={(ev) => setLongitude(ev.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>

			<Form.Group className="mb-3">
				<Form.Label>Address</Form.Label>
				<Form.Control type="text"
					onChange={(ev) => setAddress(ev.target.value)}
				/>
			</Form.Group>
			<Row>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Bedspace</Form.Label>
						<Form.Control type="number"
							onChange={(ev) => setBedspace(ev.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>HutOwnerID</Form.Label>
						<Form.Control type="number"
							onChange={(ev) => setHutOwnerID(ev.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<InputGroup>
				<Button onClick={() => props.handleCreate(name, latitude, longitude, address, bedspace, hutOwnerID)}></Button>
			</InputGroup>
		</Form>
	);
}
