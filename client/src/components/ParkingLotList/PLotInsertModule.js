import { useState } from "react";
import { Modal, Form, Row } from "react-bootstrap";
import ParkingLotAPI from "../../api/ParkingLotAPI";

export function NewPLotForm(props){
	let [lotName, setLotName] = useState("");
	let [carspaces, setCarspaces] = useState(0);
	let handleSubmit = (event) => {
		event.preventDefault();
		let newLot={name:lotName, carspaces:carspaces};
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
		<Modal show={props.show} onHide={props.Hide}>
			<Modal.Header closeButton>
				<Modal.title>New parking lot</Modal.title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Row>
						<Form.Group controlId="LotName" className="mb-3">
							<Form.Label>Name</Form.Label>
							<FormControl type ="text" value={lotName} onChange={ev => setLotName(ev.target.value)}
								onKeyPress={ev=>{
									if(ev.key==="Enter"){
										handleSubmit(ev);
									}
								}}/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group controlId="Carspaces" className="mb-3">
							<Form.Label>Carspaces</Form.Label>
							<FormControl type ="number" value={carspaces} onChange={ev => setCarspaces(ev.target.value)}
								onKeyPress={ev=>{
									if(ev.key==="Enter"){
										handleSubmit(ev);
									}
								}}/>
						</Form.Group>
					</Row>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
