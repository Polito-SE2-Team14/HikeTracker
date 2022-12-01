import { Modal, Col, Row, Button } from "react-bootstrap";
import { LocationMap } from "../Map/Maps";
import {
	faXmark,
	faPenToSquare,
	faTrashCan,
	faBed,
	faMap,
	faCity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function HutModal(props) {
	return (
		<Modal show={props.show} onHide={props.onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{props.hut.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<LocationMap point={props.hut} />
				<Row className=" mt-2">
					<Col>
						<FontAwesomeIcon icon={faCity} />
						<strong>{"Municipality (Province, Country):"}</strong>
						{` ${props.hut.municipality} (${props.hut.province}, ${props.hut.country})`}
					</Col>
				</Row>
				<Row xs={1} md={2} className="d-flex align-items-top">
					<Col>
						<FontAwesomeIcon icon={faMap} />
						<strong>{" Address:"}</strong>
						{` ${props.hut.address}`}
					</Col>
					<Col>
						<FontAwesomeIcon icon={faBed} />
						<strong>{" Available beds:"}</strong>
						{` ${props.hut.bedspace}`}
					</Col>
					<Col>
						{`by ${props.hut.creatorSurname} ${props.hut.creatorName} `}
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
								onClick={props.onClose}
							>
								<FontAwesomeIcon icon={faXmark} /> Close
							</Button>
							<Button variant="danger" onClick={props.onDelete}>
								<FontAwesomeIcon icon={faTrashCan} /> Delete
							</Button>
						</Col>
						{/* <Col className="d-flex justify-content-end">
							<Button className="me-1" variant="warning" onClick={props.onEdit}>
								<FontAwesomeIcon icon={faPenToSquare} /> Edit
							</Button>{" "}
						</Col> */}
					</Row>
				</Col>
			</Modal.Footer>
		</Modal>
	);
}
