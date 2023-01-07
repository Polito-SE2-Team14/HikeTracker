import { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { PointSelectMap } from "../Maps/PointSelectMap";
import { CountrySelect, MunicipalitySelect, ProvinceSelect } from "../CoMunProvSelect"

export function NewPLotForm(props) {
	const [lotName, setLotName] = useState("");
	const [carspace, setCarspace] = useState(0);
	const [description, setDescription] = useState("");
	const [address, setAddress] = useState("");
	const [altitude, setAltitude] = useState(0);
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [municipality, setMunicipality] = useState("");
	const [province, setProvince] = useState("");
	const [country, setCountry] = useState("");


	let handleSubmit = function(event){
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

	let selectLotName = function(ev){setLotName(ev.target.value)}
	let selectDescription = function(ev){setDescription(ev.target.value)}
	let selectAltitude = function(ev){setAltitude(ev.target.value)}
	let selectPoint = function(newPoint){
		setLatitude(newPoint[0]);
		setLongitude(newPoint[1]);
	}
	let selectAddress = function(ev){setAddress(ev.target.value)}
	let selectCarspace = function(ev){setCarspace(ev.target.value)}

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
								onChange={selectLotName}
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
								onChange={selectDescription}
								required={true} />
						</Form.Group>
					</Row>

					<Row>
						<Form.Group controlId="Altitude" className="mb-3">
							<Form.Label>Altitude</Form.Label>
							<Form.Control
								type="number"
								value={altitude}
								onChange={selectAltitude}
								required={true}
							/>
						</Form.Group>
					</Row>


					<Row>
						<PointSelectMap
							onSetPoint={selectPoint}
						/>
					</Row>

					<Row>
						<Form.Group controlId="Country" className="mb-3">
							<Form.Label>Country</Form.Label>
							<CountrySelect country={country} setCountry={setCountry} />
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="Province" className="mb-3">
							<Form.Label>Province</Form.Label>
							<ProvinceSelect
								disabled={country === ""}
								province={province}
								setProvince={setProvince}
								country={country}
							/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="Municipality" className="mb-3">
							<Form.Label>Municipality</Form.Label>
							<MunicipalitySelect
								disabled={province === ""}
								municipality={municipality}
								setMunicipality={setMunicipality}
								country={country}
								province={province}
							/>
						</Form.Group>
					</Row>
					{/* <Row>
						<Form.Group controlId="Country" className="mb-3">
							<Form.Label>Country</Form.Label>
							<Form.Control
								type="text"
								value={country}
								onChange={function(ev){setCountry(ev.target.value)}}
								required={true} />
						</Form.Group>
					</Row> */}
					<Row>
						<Form.Group controlId="Address" className="mb-3">
							<Form.Label>Address</Form.Label>
							<Form.Control
								type="text"
								value={address}
								onChange={selectAddress}
								required={true}
							/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="Carspace" className="mb-3">
							<Form.Label>Carspace</Form.Label>
							<Form.Control
								type="number"
								value={carspace}
								onChange={selectCarspace}
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
