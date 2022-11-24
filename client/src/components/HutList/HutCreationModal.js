import { useState } from "react";
import {
	Col,
	Row,
	Button,
	Form,
	Modal,
	ModalFooter,
} from "react-bootstrap";
import { PointSelectMap } from "../Map/Maps";

export function HutCreationModal(props) {
	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Hut Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<HutCreationForm handleCreate={props.handleCreate} />
			</Modal.Body>
			{props.footerVisible && (
				<ModalFooter style={{ color: "red" }}>
					{props.footerVisible}
				</ModalFooter>
			)}
		</Modal>
	);
}
function HutCreationForm(props) {
	const [name, setName] = useState(undefined);
	const [latitude, setLatitude] = useState(undefined);
	const [longitude, setLongitude] = useState(undefined);
	const [address, setAddress] = useState(undefined);
	const [bedspace, setBedspace] = useState(undefined);
	const [hutOwnerID, setHutOwnerID] = useState(undefined);

	const handleSubmit = (event) => {
		event.preventDefault();
		props.handleCreate(
			name,
			latitude,
			longitude,
			address,
			bedspace,
			hutOwnerID
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId="formTitle" className="mb-3">
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="text"
					required={true}
					onChange={(ev) => setName(ev.target.value)}
				/>
			</Form.Group>

			<Row>
				{/* <Col>
					<Form.Group className="mb-3">
						<Form.Label>Latitude</Form.Label>
						<Form.Control type="float" required={true}
							onChange={(ev) => setLatitude(ev.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Longitude</Form.Label>
						<Form.Control type="float" required={true}
							onChange={(ev) => setLongitude(ev.target.value)}
						/>
					</Form.Group>
				</Col> */}
				<PointSelectMap
					onSetPoint={(point) => {
						setLatitude(point[0]);
						setLongitude(point[1]);
					}}
				/>
			</Row>

			<Form.Group className="mb-3">
				<Form.Label>Address</Form.Label>
				<Form.Control
					type="text"
					required={true}
					onChange={(ev) => setAddress(ev.target.value)}
				/>
			</Form.Group>
			<Row>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Bedspace</Form.Label>
						<Form.Control
							type="number"
							required={true}
							onChange={(ev) => setBedspace(ev.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>HutOwnerID</Form.Label>
						<Form.Control
							type="number"
							required={true}
							onChange={(ev) => setHutOwnerID(ev.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>
			<div className="text-end">
			<Button variant="primary" type='submit' >Create</Button>
					</div>
					</Col>
				</Row>
		</Form>
	);
}
