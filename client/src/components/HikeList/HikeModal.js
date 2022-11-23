import { Modal, Button, Row, Col } from "react-bootstrap";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMountain,
	faPersonWalking,
	faFlag,
	faClock,
	faPlay,
	faTrashCan,
	faPenToSquare,
	faXmark,
	faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { HikeMap } from "../Map/Maps";

export function HikeModal(props) {
	let hike = props.hike;

	return props.hike ? (
		<Modal show={props.show} onHide={props.onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{hike.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{/*TODO(antonio): pass points to map*/}
				<HikeMap />
				<p className="text-muted mt-0">submitted by x/you</p>
				<Row xs={1} md={2} className="d-flex align-items-top mt-2">
					<Col>
						<FontAwesomeIcon icon={faPersonWalking} />
						<strong>{" Distance:"}</strong>
						{` ${hike.length} meters`}
					</Col>
					<Col>
						<FontAwesomeIcon icon={faMountain} />
						<strong>{"  Ascent:"}</strong>
						{` ${hike.ascent} meters`}
					</Col>
					<Col>
						<FontAwesomeIcon icon={faFlag} />
						<strong>{" Difficulty:"}</strong>
						{` ${hike.difficulty}`}
					</Col>
					<Col>
						<FontAwesomeIcon icon={faClock} />
						<strong>{" Expected time:"}</strong>
						{` ${hike.expectedTime} minutes`}
					</Col>
				</Row>
				<Row className="mt-3">
					<Col>
						<FontAwesomeIcon icon={faQuoteLeft} size="xl" /> {hike.description}
					</Col>
					<Col>start and end point</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer>
				<Col>
					<Row xs={2}>
						<Col>
							<Button
								className="me-1"
								variant="secondary"
								onClick={props.onClose}
							>
								<FontAwesomeIcon icon={faXmark} /> Close
							</Button>
							<Button variant="danger" onClick={props.onDelete}>
								<FontAwesomeIcon icon={faTrashCan} /> Delete
							</Button>
						</Col>
						<Col className="d-flex justify-content-end">
							<Button className="me-1" variant="warning" onClick={props.onEdit}>
								<FontAwesomeIcon icon={faPenToSquare} /> Edit
							</Button>{" "}
							<Button variant="success" onClick={props.onStart}>
								<FontAwesomeIcon icon={faPlay} /> Start
							</Button>
						</Col>
					</Row>
				</Col>
			</Modal.Footer>
		</Modal>
	) : (
		false
	);
}
