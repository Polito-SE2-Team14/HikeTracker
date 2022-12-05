import { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { PointSelectMap } from "../Map/Maps";

export function NewPLotForm(props) {
	let [lotName, setLotName] = useState("");
	let [carspace, setCarspace] = useState(0);
	let [description, setDescription] = useState(undefined);
	let [address, setAddress] = useState(undefined);
	let [altitude, setAltitude] = useState(undefined);
	let [latitude, setLatitude] = useState(undefined);
	let [longitude, setLongitude] = useState(undefined);
	let [municipality, setMunicipality] = useState("");
	let [province, setProvince] = useState("");
	let [country, setCountry] = useState("");

	
	let handleSubmit = (event) => {
		event.preventDefault();
		let newLot = {
			name: lotName, municipality: municipality, province: province,
			carspace: Number(carspace), latitude: latitude, longitude: longitude,
			description: description, altitude: altitude, country: country, address: address
		};
		try {
			props.addPlot(newLot)
		}
		catch (e) { console.error(e) }

		props.onHide();
	}
	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>New parking lot</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					<Row>
						<Form.Group controlId="LotName" className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								value={lotName}
								onChange={ev => setLotName(ev.target.value)}
								required={true}
							/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="Description" className="mb-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								value={description}
								onChange={ev => setDescription(ev.target.value)}
								required={true} />
						</Form.Group>
					</Row>

					<Row>
						<Form.Group controlId="Altitude" className="mb-3">
							<Form.Label>Altitude</Form.Label>
							<Form.Control
								type="number"
								value={altitude}
								onChange={ev => setAltitude(ev.target.value)}
								required={true}
							/>
						</Form.Group>
					</Row>


					<Row>
						<PointSelectMap
							onSetPoint={(newPoint) => {
								setLatitude(newPoint[0]);
								setLongitude(newPoint[1]);
							}}
						/>
					</Row>

					<Row>
						<Form.Group controlId="Municipality" className="mb-3">
							<Form.Label>Municipality</Form.Label>
							<Form.Control
								type="text"
								value={municipality}
								onChange={ev => setMunicipality(ev.target.value)}
								required={true} />
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="Province" className="mb-3">
							<Form.Label>Province</Form.Label>
							<Form.Control
								type="text"
								value={province}
								onChange={ev => setProvince(ev.target.value)}
								required={true} />
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="Country" className="mb-3">
							<Form.Label>Country</Form.Label>
							<Form.Control
								type="text"
								value={country}
								onChange={ev => setCountry(ev.target.value)}
								required={true} />
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="Address" className="mb-3">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								value={address}
								onChange={ev => setAddress(ev.target.value)}
								required={true}
							/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="Carspace" className="mb-3">
							<Form.Label>Carspace</Form.Label>
							<Form.Control
								ype="number"
								value={carspace}
								onChange={ev => { setCarspace(ev.target.value) }}
								required={true} />
						</Form.Group>
					</Row>
					<Row>
						<Col>
							<div className="text-end">
								<Button variant="primary" type='submit'>Create</Button>
							</div>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
