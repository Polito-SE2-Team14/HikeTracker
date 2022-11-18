import { useState } from "react";
import {
	Col, Row,
	Button,
	Form,
	InputGroup,
	Modal,
	ModalFooter
} from "react-bootstrap";

export function HutCreationModal(props) {

	console.log(props.footerVisible)

	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Hut Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<HutCreationForm handleCreate={props.handleCreate} />
			</Modal.Body>
			{props.footerVisible && <ModalFooter>Error in input</ModalFooter>}
		</Modal>
	);
}
function HutCreationForm(props) {

	const [name, setName] = useState(undefined)
	const [latitude, setLatitude] = useState(undefined)
	const [longitude, setLongitude] = useState(undefined)
	const [address, setAddress] = useState(undefined)
	const [bedspace, setBedspace] = useState(undefined)
	const [hutOwnerID, setHutOwnerID] = useState(undefined)


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
