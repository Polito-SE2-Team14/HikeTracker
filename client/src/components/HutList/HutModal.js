import { Modal, Col, Row, Button } from "react-bootstrap";
import { LocationMap } from "../Maps/LocationMap";
import {
	faXmark,
	faTrashCan,
	faBed,
	faMap,
	faCity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoleManagement from "../../class/RoleManagement";
import { useState, useEffect } from "react";
import PointAPI from "../../api/PointAPI";

export function HutModal(props) {
	const [showMap, setShowMap] = useState(false);
	const [image, setImage] = useState('');

	useEffect(() => {
		const getImage = async () => {
			let newImage = await PointAPI.getImage(props.hut.pointID);

			setImage(newImage);
		};

		getImage();
	}, [props.hut.pointID]);

	return (
		<Modal show={props.show} onHide={props.onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{props.hut.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row className=" mt-2">
					<Col>
						<strong>{" Description: "}</strong>
						{props.hut.description ? props.hut.description : "None"}
					</Col>
					<Col className="text-end">
						<Button variant="info" onClick={() => setShowMap(v => !v)}>
							Show {showMap ? 'Image' : 'Map'}
						</Button>
					</Col>
				</Row>

				<br />
				{showMap ? 
					<LocationMap point={props.hut} /> :
					<img
						src={image}
						className="img-fluid mt-4"
						alt="..."
					/>
				}
				<Row className=" mt-2">
					<Col>
						<FontAwesomeIcon icon={faCity} />
						<strong>
							{` ${props.hut.municipality} (${props.hut.province}, ${props.hut.country})`}
						</strong>
					</Col>
				</Row>
				<Row xs={1} className="d-flex align-items-top">
					<Col>
						<FontAwesomeIcon icon={faMap} />
						<strong>{" Address:"}</strong>
						{` ${props.hut.address}`}
					</Col>
				</Row>
				<Row className=" mt-2">
					<Col>
						<strong>{" Altitude: "}</strong>
						{props.hut.altitude ? `${props.hut.altitude} meters` : "None"}
					</Col>
				</Row>
				<hr />
				<Row xs={1} md={2} className="d-flex align-items-top">
					<Col>
						<strong>{" Website:"}</strong>
						{` ${props.hut.website ? props.hut.website : "None"}`}
					</Col>
					<Col>
						<strong>{" Email:"}</strong>
						{` ${props.hut.email ? props.hut.email : "None"}`}
					</Col>
				</Row>
				<Row xs={1} md={2} className="d-flex align-items-top">
					<Col>
						<strong>{" Phone Number:"}</strong>
						{` ${props.hut.phoneNumber ? props.hut.phoneNumber : "None"}`}
					</Col>
				</Row>
				<hr />
				<Row xs={1} md={2} className="d-flex align-items-top">
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
							{RoleManagement.isAuthor(props.user, props.hut.creatorID) ? (
								<Button variant="danger" onClick={props.onDelete}>
									<FontAwesomeIcon icon={faTrashCan} /> Delete
								</Button>
							) : (
								false
							)}
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
