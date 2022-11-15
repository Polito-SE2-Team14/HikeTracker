import {
	Modal,
	Tabs,
	Tab,
	Button,
	Card,
	Row,
	Col,
	Container,
} from "react-bootstrap";
import React, { useState } from "react";
import HikeListRow from "./HikeListRow";
import { HikeModal } from "./HikeModal";
import { HikeEditForm } from "./HikeEditForm";
import { HikeDescriptionModal } from "./HikeDescriptionModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMountain,
	faPersonWalking,
	faFlag,
	faClock,
	faUpRightAndDownLeftFromCenter,
	faPlay,
	faTrashCan,
	faPenToSquare,
	faXmark,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { HikeMap } from "../Map/Maps";

function HikeListTable(props) {
	const [showHikeModal, setShowHikeModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showHikeDescriptionModal, setShowHikeDescriptionModal] =
		useState(false);

	const [selectedHike, setSelectedHike] = useState();
	const [points, setPoints] = useState(null);
	const [hikeDescription, setHikeDescription] = useState(null);

	const handleCloseHikeModal = () => {
		setSelectedHike(null);
		setShowHikeModal(false);
	};

	const handleShowHikeModal = (hike) => {
		setSelectedHike(hike);
		setShowHikeModal(true);
	};
	const handleShowHikeDescriptionModal = () => {
		setShowHikeDescriptionModal(true);
	};

	const handleCloseHikeDescriptionModal = () => {
		setShowHikeDescriptionModal(false);
	};

	const handleShowEditModal = (hike) => {
		setSelectedHike(hike);
		setShowEditModal(true);
	};

	const handleCloseEditModal = () => {
		setSelectedHike(null);
		setShowEditModal(false);
	};

	const handleNewHikeModal = () => {
		setSelectedHike(null);
		setShowEditModal(true);
	};

	return (
		<>
			{/* 		<HikeModal
				show={showHikeModal}
				onHide={handleCloseHikeModal}
				onClose={handleCloseHikeModal}
				points={points}
			/> */}

			{/* 			<HikeDescriptionModal
				show={showHikeDescriptionModal}
				onHide={handleCloseHikeDescriptionModal}
				onClose={handleCloseHikeDescriptionModal}
				hikeDescription={hikeDescription}
			/> */}

			<HikeEditForm
				show={showEditModal}
				hike={selectedHike}
				setHikes={props.setHikes}
				onHide={handleCloseEditModal}
			/>

			<HikeInfo
				show={showHikeModal}
				hike={selectedHike}
				onHide={handleCloseHikeModal}
			/>

			<Row xs={1} md={2} xl={3} className="d-flex align-items-center">
				{props.hikes.map((hike, idx) => (
					<HikeListItem
						hike={hike}
						key={idx}
						onShowHike={handleShowHikeModal}
					/>
				))}
			</Row>

			{/* <Table className="table-hover table-border">
				<thead>
					<tr>
						{props.user.type === "Local guide" ? <th></th> : false}
						<th>Title</th>
						<th>Length</th>
						<th>Expected Time</th>
						<th>Ascent</th>
						<th>Difficulty</th>
						<th>Description</th>
						<th>Points</th>
						{props.mode && props.mode === "edit" && <th>Actions</th>}
					</tr>
				</thead>
				<tbody>
					{props.hikes ? (
						props.hikes.map((hike, i) => (
							<HikeListRow
								key={i}
								hike={hike}
								user={props.user}
								mode={props.mode}
								handleShowModal={handleShowHikeModal}
								handleEditModal={handleShowEditModal}
								handleShowHikeDescriptionModal={handleShowHikeDescriptionModal}
								setPoints={setPoints}
								setHikeDescription={setHikeDescription}
							/>
						))
					) : (
						<tr>
							{props.user.type === "Local guide" ? <td></td> : false}
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					)}
				</tbody>
			</Table>
			<span>
				{props.user.type === "Local guide" ? (
					<>
						<Button variant="success" onClick={handleNewHikeModal}>
							+
						</Button>
						{" Insert new hike"}
					</>
				) : (
					false
				)}
			</span> */}
		</>
	);
}

function HikeListItem(props) {
	let hike = props.hike;

	return (
		<Col className="mt-3">
			<Card>
				<Card.Body>
					<Card.Title>
						<Row className="d-flex justify-content-between">
							<Col>{hike.title}</Col>
							<Col className="d-flex justify-content-end">
								<Button
									size="sm"
									variant="outline-secondary"
									onClick={() => {
										props.onShowHike(hike);
									}}
								>
									<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
								</Button>
							</Col>
						</Row>
					</Card.Title>
					<Container>
						<Row>
							<Col>
								<FontAwesomeIcon icon={faPersonWalking} /> {hike.length / 1000}
								{" Km"}
							</Col>
							<Col>
								<FontAwesomeIcon icon={faMountain} /> {hike.ascent}
								{" m"}
							</Col>
						</Row>
						<Row>
							<Col>
								<FontAwesomeIcon icon={faFlag} /> {hike.difficulty}
							</Col>
							<Col>
								<FontAwesomeIcon icon={faClock} /> {hike.expectedTime}
								{" '"}
							</Col>
						</Row>
					</Container>
				</Card.Body>
			</Card>
		</Col>
	);
}

function HikeInfo(props) {
	let hike = props.hike;

	return props.hike ? (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>{hike.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
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
					<Col>{hike.description}</Col>
					<Col>start and end point</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer className="d-flex justify-content-between">
				<Col>
					<Button className="mr-10" variant="secondary" onClick={props.onHide}>
						<FontAwesomeIcon icon={faXmark} />{" "}
						Close
					</Button>{" "}
					<Button variant="danger" onClick={props.onHide}>
						<FontAwesomeIcon icon={faTrashCan} />{" "}
						Delete
					</Button>
				</Col>
				<Col className="text-end">
					<Button variant="warning" onClick={props.onHide}>
						<FontAwesomeIcon icon={faPenToSquare} />{" "}
						Edit
					</Button>{" "}
					<Button variant="success" onClick={props.onHide}>
						<FontAwesomeIcon icon={faPlay} />{" "}
						Start
					</Button>
				</Col>
			</Modal.Footer>
		</Modal>
	) : (
		false
	);
}

export default HikeListTable;
