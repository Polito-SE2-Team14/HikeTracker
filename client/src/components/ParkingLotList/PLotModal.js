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
						<strong>{" Altitude:"}</strong>
						<br />{` ${props.lot.altitude}`}
					</Col>
				</Row>
				<Row className=" mt-2">
					<Col>
						<FontAwesomeIcon icon={faCity} />
						<strong>{" Municipality (Province, Country):"}</strong>
						<br />{` ${props.lot.municipality} (${props.lot.province}, ${props.lot.country})`}
					</Col>
				</Row>
				{props.lot.description &&
					<Row className=" mt-2">
					<Col>
						<strong>{" Description:"}</strong>
						<br />{` ${props.lot.description}`}
					</Col>
				</Row>}
				<Row xs={1} md={2} className="d-flex align-items-top">
					{props.lot.address != null && <Col>
						<FontAwesomeIcon icon={faMap} />
						<strong>{" Address:"}</strong>
						{` ${props.lot.address}`}
					</Col>}
					<Col>
						<FontAwesomeIcon icon={faBed} />
						<strong>{" Carspace:"}</strong>
						{` ${props.lot.carspace}`}
					</Col>
					<Col>
						{`by ${props.lot.creatorSurname} ${props.lot.creatorName} `}
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