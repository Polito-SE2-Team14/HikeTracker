import { Modal, Button, Row, Col } from "react-bootstrap";
import React from "react";
import { LocationMap } from "../Maps/LocationMap";
import {
	faXmark,
	faTrashCan,
	faBed,
	faMap,
	faCity,
	faCar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoleManagement from "../../class/RoleManagement";

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
						<strong>
							{` ${props.lot.municipality} (${props.lot.province}, ${props.lot.country})`}
						</strong>
					</Col>
				</Row>
				{props.lot.description && (
					<Row className=" mt-2">
						<Col>
							<strong>{" Description:"}</strong>
							<br />
							{` ${props.lot.description}`}
						</Col>
					</Row>
				)}
				<Row xs={1} md={2} className="d-flex align-items-top">
					{props.lot.address != null && (
						<Col>
							<FontAwesomeIcon icon={faMap} />
							<strong>{" Address:"}</strong>
							{` ${props.lot.address}`}
						</Col>
					)}
					<Col>
						<Row>
							<Col>
								<strong>{" Altitude:"}</strong>
								{` ${props.lot.altitude} meters`}
							</Col>
						</Row>
					</Col>
					<Col className="mt-2">
						<FontAwesomeIcon icon={faCar} />
						<strong>{" Carspace:"}</strong>
						{` ${props.lot.carspace}`}
					</Col>
					<Col className="mt-2">
						{`by ${props.lot.creatorName} ${props.lot.creatorSurname} `}
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
							{RoleManagement.isAuthor(props.user, props.lot.creatorID) ? (
								<Button variant="danger" onClick={props.onDelete}>
									<FontAwesomeIcon icon={faTrashCan} /> Delete
								</Button>
							) : (
								false
							)}
						</Col>
					</Row>
				</Col>
			</Modal.Footer>
		</Modal>
	);
}
