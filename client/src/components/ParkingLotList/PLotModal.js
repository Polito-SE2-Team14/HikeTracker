import { Modal, Button, Row, Col } from "react-bootstrap";
import React from "react";
import { LocationMap } from "../Map/Maps";
import {
	faXmark,
	faPenToSquare,
	faTrashCan,
	faBed,
	faMap,
	faCity,
	faHouse,
	faCar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function PLotModal(props) {
	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>{props.lot.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<LocationMap point={props.lot} />
				<Row className=" mt-2">
					<Col>
						<FontAwesomeIcon icon={faCity} />
						<strong>{" Province:"}</strong>
						{` ${props.lot.municipality} (${props.lot.province})`}
					</Col>
				</Row>
				<Row xs={1} md={2} className="d-flex align-items-top">
					<Col>
						<FontAwesomeIcon icon={faMap} />
						<strong>{" Address:"}</strong>
						{` ${props.lot.address}`}
					</Col>
					<Col>
						<FontAwesomeIcon icon={faBed} />
						<strong>{" Carspace:"}</strong>
						{` ${props.lot.carspace}`}
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Col>
					<Row xs={2}>
						<Col>
							<Button
								className="me-1"
								variant="secondary"
								onClick={props.onHide}
							>
								<FontAwesomeIcon icon={faXmark} /> Close
							</Button>
							<Button variant="danger" onClick={props.onDelete}>
								<FontAwesomeIcon icon={faTrashCan} /> Delete
							</Button>
						</Col>
					</Row>
				</Col>
			</Modal.Footer>
		</Modal>
	);
}