import { useState } from "react";
import {
	Col,
	Row,
	Button,
	Form,
	Modal,
	ModalFooter,
	InputGroup,
} from "react-bootstrap";
import { PointSelectMap } from "../Map/Maps";
import { CountryDropdown, MunicipalityDropdown, ProvinceDropdown } from "../Dropdowns"

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
	const [name, setName] = useState("");
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [altitude, setAltitude] = useState(0);
	const [description, setDescription] = useState("");
	const [email, setEmail] = useState("");
	const [website, setWebsite] = useState("");
	const [phoneNumber, setPhoneNumber] = useState(0);
	const [address, setAddress] = useState("");
	const [country, setCountry] = useState("");
	const [province, setProvince] = useState("");
	const [municipality, setMunicipality] = useState("");
	const [bedspace, setBedspace] = useState(0);

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
						type="float"
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
						<CountryDropdown
							country={country}
							setCountry={setCountry}
						/>
					</Col>
					<Col>
						<Form.Label>Province</Form.Label>
						<ProvinceDropdown
							disabled={country===""}
							province={province}
							setProvince={setProvince}
							country={country}
						/>
					</Col>
				</Row>
				<Row>
					<Form.Label>Municipality</Form.Label>
					<MunicipalityDropdown
						disabled={province===""}
						municipality={municipality}
						setMunicipality={setMunicipality}
						country={country}
						province={province}
					/>
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
							type="email"
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
							type="number"
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
