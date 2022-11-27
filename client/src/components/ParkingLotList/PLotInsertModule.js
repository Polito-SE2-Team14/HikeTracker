import { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { PointSelectMap } from "../Map/Maps";
import ParkingLotAPI from "../../api/ParkingLotAPI";

export function NewPLotForm(props){
	let [lotName, setLotName] = useState("");
	let [carspace, setCarspace] = useState(0);
	let [latitude, setLatitude] = useState(undefined);
	let [longitude, setLongitude] = useState(undefined);
	let [municipality, setMunicipality] = useState("");
	let [province, setProvince] = useState("");
	let handleSubmit = (event) => {
		event.preventDefault();
		let newLot={name:lotName, municipality:municipality, province:province, carspace:Number(carspace), latitude:latitude, longitude:longitude};
		ParkingLotAPI.addParkingLot(newLot)
			.then(()=>{
				props.setLots((old)=>[...old,newLot]);
			})
			.catch((err)=>{
				throw(err);
			});
		props.onHide();
	}
	return(
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>New parking lot</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Row>
						<Form.Group controlId="LotName" className="mb-3">
							<Form.Label>Name</Form.Label>
							<Form.Control type ="text" value={lotName} onChange={ev => setLotName(ev.target.value)}
								onKeyPress={ev=>{
									if(ev.key==="Enter"){
										handleSubmit(ev);
									}
								}}/>
						</Form.Group>
					</Row>

					<Row>
						<PointSelectMap
							onSetPoint={(newPoint)=>{
								setLatitude(newPoint[0]);
								setLongitude(newPoint[1]);
							}}
						/>
					</Row>

					<Row>
						<Form.Group controlId="Municipality" className="mb-3">
							<Form.Label>Municipality</Form.Label>
							<Form.Control type ="text" value={municipality} onChange={ev => setMunicipality(ev.target.value)}
								onKeyPress={ev=>{
									if(ev.key==="Enter"){
										handleSubmit(ev);
									}
								}}/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="Province" className="mb-3">
							<Form.Label>Province</Form.Label>
							<Form.Control type ="text" value={province} onChange={ev => setProvince(ev.target.value)}
								onKeyPress={ev=>{
									if(ev.key==="Enter"){
										handleSubmit(ev);
									}
								}}/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="Carspace" className="mb-3">
							<Form.Label>Carspace</Form.Label>
							<Form.Control type ="number" value={carspace} onChange={ev => {setCarspace(ev.target.value)}}
								onKeyPress={ev=>{
									if(ev.key==="Enter"){
										handleSubmit(ev);
									}
								}}/>
						</Form.Group>
					</Row>
					<Row>
						<Col>
							<div className="text-end">
								<Button variant="primary" type='submit' onClick={handleSubmit}>Create</Button>
							</div>
						</Col>
					</Row>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
