import { Button, Card, Row, Col, Container } from "react-bootstrap";
import React, { useState } from "react";
import ParkingLotAPI from "../../api/ParkingLotAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCar,
	faUpRightAndDownLeftFromCenter
} from "@fortawesome/free-solid-svg-icons";

import { PLotModal } from "./PLotModal";

function PLotListTable(props){
	return(
		<Row xs={1} md={2} xl={3} className="d-flex align-items-center mb-5">
			{props.lots.map((lot,i)=>(
				<div key={i}>
					<PLotListItem
						lot={lot}
						setLots={props.setLots}
					/>
				</div>
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
		ParkingLotAPI.deleteParkingLot(lot.pLotId)
			.then(()=>{
				props.setLots((old)=>
					old.filter((oldLot)=>oldLot.pLotId!==lot.pLotId)
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
							<Row>
								<Col xs={8} sm={9}>{props.lot.name}</Col>
								<Col className="text-end">
									<Button
										size="sm"
										variant="secondary"
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
									{props.lot.carspace}
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