import { Modal, Button, Row, Col } from "react-bootstrap";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCar
} from "@fortawesome/free-solid-svg-icons";

export function PLotModal(props){
	return(
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>{props.lot.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row xs={1} md={2} className="d-flex align-items-top mt-2">
					<Col>
						<FontAwesomeIcon icon={faCar}/>
						<strong>{"Carspaces: "}</strong>
						{props.lot.carspaces}
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