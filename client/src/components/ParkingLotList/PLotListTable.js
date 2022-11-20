import { Button, Card, Row, Col, Container } from "react-bootstrap";
import React, { useState } from "react";
import ParkingLotAPI from "../../api/ParkingLotAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCar
} from "@fortawesome/free-solid-svg-icons";

import { PLotModal } from "./PLotModal";
import HikeAPI from "../../api/HikeAPI";

function PLotListTable(props){
	return(
		<Row xs={1} md={2} xl={3} className="d-flex align-items-center">
			{props.lots.map((lot,i)=>(
				<>
					<PLotListItem
						key={i}
						lot={lot}
					/>
				</>
			))}
		</Row>
	);
}

function PLotListItem(props) {
	const [showModal, setShowModal] = useState(false);
	const handleShowModal=()=>{
		setShowModal(true);
	}
	const handleHideModal=()=>{
		setShowModal(false);
	}
	const handleDeletePLot=(lot)=>{
		setShowModal(false);
		ParkingLotAPI.deleteParkingLot(lot.id)
			.then(()=>{
				props.setLots((old)=>
					old.filter((oldLot)=>oldLot.id!==lot.id)
				);
			})
			.catch((err)=>console.log(err));
	};
	return(
		<>
			<PLotModal
				lot={props.lot}
				show={showModal}
				onHide={() => handleHideModal()}
				onDelete={() => handleDeletePLot(props.lot)}
			/>

			<Col className="mt-3">
				<Card>
					<Card.Body>
						<Card.Title>
							<Row classname="d-flex justify-content-between">
								<Col>{props.lot.name}</Col>
								<Col className="d-flex justify-content-end">
									<Button
										size="sm"
										variant="outline-secondary"
										onClick={handleShowModal}
									>
										<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
									</Button>
								</Col>
							</Row>
						</Card.Title>
						<Container>
							<Row>
								<Col>
									<FontAwesomeIcon icon={faCar}/>{" "}
									{(props.lot.carspaces).toFixed(0)}
								</Col>
							</Row>
						</Container>
					</Card.Body>
				</Card>
			</Col>
		</>
	)
}
export default PLotListTable;