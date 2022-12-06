import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
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
import { EmptySearch } from "../EmptySeach";

import { HikeFilters } from "./HikeFilters";
import "../../styles/HikeListTable.css";
import RoleManagement from "../../class/RoleManagement";

import { timeText } from "../HikeData";

function HikeListTable(props) {
	const handleShowEditForm = (hike) => {
		props.setSelectedHike(hike);
		props.showHikeForm();
	};

	let shownHikes = props.hikes.map((hike, i) => (
		<Col key={i}>
			<HikeListItem
				user={props.user}
				hike={hike}
				setHikes={props.setHikes}
				handleEditForm={handleShowEditForm}
			/>
		</Col>
	));

	return (
		<Row>
			<Col lg={3} className="d-none d-xl-block">
				{RoleManagement.isLocalGuide(props.user.userType) ? (
					<Row className="mb-3">{props.insertButton}</Row>
				) : (
					false
				)}
				<Row>
					<Card className="p-2">
						<h3>Filters</h3>
						<Container>
							<h5>Name</h5>
							<Form.Control
								type="search"
								placeholder="Search"
								value={props.filters.title}
								onChange={(ev) =>
									props.setFilters({
										...props.filters,
										title: ev.target.value.trim(),
									})
								}
							/>
							<hr />
							<HikeFilters
								filters={props.filters}
								setFilters={props.setFilters}
							/>
						</Container>
					</Card>
				</Row>
			</Col>

			<Col className="mb-5">
				<Row xs={1} md={2} xl={3} className="d-flex align-items-center">
					{shownHikes.length === 0 ? <EmptySearch /> : shownHikes}
				</Row>
			</Col>
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
			{<HikeModal
				show={showHikeModal}
				hike={props.hike}
				user={props.user}
				onClose={() => handleCloseHikeModal()}
				onDelete={() => handleDeleteHike(props.hike)}
				onEdit={() => props.handleEditForm(props.hike)}
				onStart={() => {
					//TODO(antonio): start function
				}}/>}

			<Col className="mt-3">
				<Card>
					<Card.Body>
						<Card.Title>
							<Row className="top-row">
								<Col xs={8} sm={9}>
									{props.hike.title.slice(0, 25).concat("...")}
								</Col>
								<Col className="text-end">
									<Button
										size="sm"
										variant="secondary"
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
							<Row className="bottom-row">
								<Col>
									<FontAwesomeIcon icon={faFlag} /> {props.hike.difficulty}
								</Col>
								<Col>
									<FontAwesomeIcon icon={faClock} /> {timeText(props.hike.expectedTime)}
								</Col>
							</Row>
						</Container>
					</Card.Body>
					{/* <Card.Footer className="text-muted">{`suggested/show date of last play?`}</Card.Footer> */}
				</Card>
			</Col>
		</>
	);
}

export default HikeListTable;
