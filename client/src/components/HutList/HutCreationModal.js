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
	const [altitude, setAltitude] = useState(undefined);
	const [description, setDescription] = useState(undefined);
	const [email, setEmail] = useState(undefined);
	const [website, setWebsite] = useState(undefined);
	const [phoneNumber, setPhoneNumber] = useState(undefined);
	const [address, setAddress] = useState(undefined);
	const [country, setCountry] = useState(undefined);
	const [province, setProvince] = useState(undefined);
	const [municipality, setMunicipality] = useState(undefined);
	const [bedspace, setBedspace] = useState(undefined);

	const handleSubmit = (event) => {
		event.preventDefault();
		props.handleCreate(
			{
				name: name, description: description, bedspace: bedspace,
				latitude: latitude, longitude: longitude, altitude: altitude,
				address: address, country: country, province: province, municipality: municipality,
				email: email, website: website, phoneNumber: phoneNumber
			}
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Row>
				<Form.Group controlId="formTitle" className="mb-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						required={true}
						onChange={(ev) => setName(ev.target.value)}
					/>
				</Form.Group>
			</Row>
			<Row>
				<Form.Group className="mb-3">
					<Form.Label>Description</Form.Label>
					<Form.Control
						type="text"
						required={true}
						onChange={(ev) => setDescription(ev.target.value)}
					/>
				</Form.Group>
			</Row>
			<Row>
				<Form.Group className="mb-3">
					<Form.Label>Altitude</Form.Label>
					<Form.Control
						type="number"
						required={true}
						onChange={(ev) => setAltitude(ev.target.value)}
					/>
				</Form.Group>
			</Row>
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
				<Row>
					<Col>
						<Form.Label>Country</Form.Label>
						<Form.Control
							type="text"
							required={true}
							onChange={(ev) => setCountry(ev.target.value)}
						/>
					</Col>
					<Col>
						<Form.Label>Province</Form.Label>
						<Form.Control
							type="text"
							required={true}
							onChange={(ev) => setProvince(ev.target.value)}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Form.Label>Municipality</Form.Label>
						<Form.Control
							type="text"
							required={true}
							onChange={(ev) => setMunicipality(ev.target.value)}
						/></Col>
				</Row>
			</Form.Group>

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
			</Row>
			<Row>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="text"
							required={true}
							onChange={(ev) => setEmail(ev.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>
			<Row>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Phone Number</Form.Label>
						<Form.Control
							type="text"
							required={true}
							onChange={(ev) => setPhoneNumber(ev.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Website (optional)</Form.Label>
						<Form.Control
							type="text"
							onChange={(ev) => setWebsite(ev.target.value)}
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
