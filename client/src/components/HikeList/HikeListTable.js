import { Button, Card, Row, Col, Container } from "react-bootstrap";
import React, { useState } from "react";
import HikeAPI from "../../api/HikeAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMountain,
	faPersonWalking,
	faFlag,
	faClock,
	faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";

import { HikeModal } from "./HikeModal";

function HikeListTable(props) {
	const handleShowEditForm = (hike) => {
		props.setSelectedHike(hike);
		props.showHikeForm();
	};

	return (
		<Row xs={1} md={2} xl={3} className="d-flex align-items-center">
			{props.hikes.filter((h)=>h.show).map((hike, i) => (
				<div key={i}>
					<HikeListItem
						user={props.user}
						hike={hike}
						setHikes={props.setHikes}
						handleEditForm={handleShowEditForm}
					/>
				</div>
			))}
		</Row>
	);
}

function HikeListItem(props) {
	const [showHikeModal, setShowHikeModal] = useState(false);

	const handleCloseHikeModal = () => {
		setShowHikeModal(false);
	};

	const handleShowHikeModal = () => {
		setShowHikeModal(true);
	};

	/* 	const [showDeleteAlert, setShowDeleteAlert] = useState(false);

	const handleShowDeleteAlert = () => {
		setShowDeleteAlert(true);
	};

	const handleCloseDeleteAlert = () => {
		setShowDeleteAlert(false);
	}; */

	const handleDeleteHike = (hike) => {
		setShowHikeModal(false);
		HikeAPI.deleteHike(hike.hikeID)
			.then(() => {
				props.setHikes((old) =>
					old.filter((item) => item.hikeID !== hike.hikeID)
				);
			})
			.catch((err) => console.log(err));
	};

	// TODO(antonio): hike delete alert
	return (
		<>
			<HikeModal
				show={showHikeModal}
				hike={props.hike}
				user={props.user}
				onClose={() => handleCloseHikeModal()}
				onDelete={() => handleDeleteHike(props.hike)}
				onEdit={() => props.handleEditForm(props.hike)}
				onStart={() => {}}
			/>

			<Col className="mt-3">
				<Card>
					<Card.Body>
						<Card.Title>
							<Row className="d-flex justify-content-between">
								<Col>{props.hike.title}</Col>
								<Col className="d-flex justify-content-end">
									<Button
										size="sm"
										variant="outline-secondary"
										onClick={handleShowHikeModal}
									>
										<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
									</Button>
								</Col>
							</Row>
						</Card.Title>
						<Container>
							<Row>
								<Col>
									<FontAwesomeIcon icon={faPersonWalking} />{" "}
									{(props.hike.length / 1000).toFixed(2)}
									{" Km"}
								</Col>
								<Col>
									<FontAwesomeIcon icon={faMountain} /> {props.hike.ascent}
									{" m"}
								</Col>
							</Row>
							<Row>
								<Col>
									<FontAwesomeIcon icon={faFlag} /> {props.hike.difficulty}
								</Col>
								<Col>
									<FontAwesomeIcon icon={faClock} /> {props.hike.expectedTime}
									{" '"}
								</Col>
							</Row>
						</Container>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
}

export default HikeListTable;
