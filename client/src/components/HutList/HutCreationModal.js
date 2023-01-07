import { useCallback, useEffect, useState } from "react";
import {
	Col,
	Row,
	Button,
	Form,
	Modal,
	ModalFooter,
} from "react-bootstrap";
import { PointSelectMap } from "../Maps/PointSelectMap";
// import { CountryDropdown, MunicipalityDropdown, ProvinceDropdown } from "../Dropdowns"
import { CountrySelect, MunicipalitySelect, ProvinceSelect } from "../CoMunProvSelect"
import { ImageForm } from '../ImageForm';

import PointAPI from "../../api/PointAPI";

export function HutCreationModal(props) {
	const [hutID, setHutID] = useState(null);
	const [image, setImage] = useState(false);
	const [show, setShow] = useState(false);

	const handleCreate = useCallback(async hut => {
		let newHut = await props.handleCreate(hut);

		setHutID(newHut);
	}, [props.show]);

	useEffect(() => {
		if (props.show && !image)
			setShow(true);
		else if (image) {
			setShow(false);
			setHutID(null);
		}
	}, [props.show, image]);

	return (
		<Modal show={show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Hut Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{!hutID ?
					<HutCreationForm handleCreate={handleCreate} /> :
					<ImageForm
						id={hutID}
						setImage={setImage}
						API={PointAPI}
					/>
				}
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

	const handleSubmit = function(event){
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

	let selectName=function(ev){setName(ev.target.value)}
	let selectDescription=function(ev){setDescription(ev.target.value)}
	let selectAltitude=function(ev){setAltitude(ev.target.value)}
	let selectPoint=function(point){
		setLatitude(point[0]);
		setLongitude(point[1]);
	}

	let selectAddress =function(ev){setAddress(ev.target.value)}
	let selectBedspace =function(ev){setBedspace(ev.target.value)}
	let selectEmail =function(ev){setEmail(ev.target.value)}
	let selectPhoneNumber =function(ev){setPhoneNumber(ev.target.value)}
	let selectWebsite =function(ev){setWebsite(ev.target.value)}

	return (
		<Form onSubmit={handleSubmit}>
			<Row>
				<Form.Group controlId="formTitle" className="mb-3">
					<Form.Label>Name</Form.Label>
					<Form.Control
						type="text"
						required={true}
						onChange={selectName}
					/>
				</Form.Group>
			</Row>
			<Row>
				<Form.Group className="mb-3">
					<Form.Label>Description</Form.Label>
					<Form.Control
						type="text"
						required={true}
						onChange={selectDescription}
					/>
				</Form.Group>
			</Row>
			<Row>
				<Form.Group className="mb-3">
					<Form.Label>Altitude</Form.Label>
					<Form.Control
						type="float"
						required={true}
						onChange={selectAltitude}
					/>
				</Form.Group>
			</Row>
			<Row>
				{/* <Col>
					<Form.Group className="mb-3">
						<Form.Label>Latitude</Form.Label>
						<Form.Control type="float" required={true}
							onChange={function(ev){setLatitude(ev.target.value)}}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Longitude</Form.Label>
						<Form.Control type="float" required={true}
							onChange={function(ev){setLongitude(ev.target.value)}}
						/>
					</Form.Group>
				</Col> */}
				<PointSelectMap
					onSetPoint={selectPoint}
				/>
			</Row>

			<Form.Group className="mb-3">
				<Row>
					<Form.Label>Country</Form.Label>
					<CountrySelect
						country={country}
						setCountry={setCountry}
					/>

				</Row>
				<Row>
					<Form.Label>Province</Form.Label>
					<ProvinceSelect
						disabled={country === ""}
						province={province}
						setProvince={setProvince}
						country={country}
					/>
				</Row>
				<Row>
					<Form.Label>Municipality</Form.Label>
					<MunicipalitySelect
						disabled={province === ""}
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
					onChange={selectAddress}
				/>
			</Form.Group>
			<Row>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Bedspace</Form.Label>
						<Form.Control
							type="number"
							required={true}
							onChange={selectBedspace}
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
							onChange={selectEmail}
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
							onChange={selectPhoneNumber}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group className="mb-3">
						<Form.Label>Website (optional)</Form.Label>
						<Form.Control
							type="text"
							onChange={selectWebsite}
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
