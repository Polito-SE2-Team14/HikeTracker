import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
import React, { useState } from "react";
import HikeAPI from "../../api/HikeAPI";
import HikeRecordsAPI from "../../api/HikeRecordsAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMountain,
	faPersonWalking,
	faFlag,
	faClock,
	faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";

import { HikeModal } from "./HikeModal";
import { EmptySearch } from "../EmptySearch";

import { HikeFilters } from "./HikeFilters";
import "../../styles/HikeListTable.css";
import RoleManagement from "../../class/RoleManagement";

import { timeText } from "../HikeData";
const dayjs = require('dayjs')

function HikeListTable(props) {
	const handleShowEditForm = (hike) => {
		props.setSelectedHike(hike);
		props.showHikeForm();
	};

	let shownHikes = props.shownHikes.map((hike, i) => (
		<Col key={i}>
			<HikeListItem
				user={props.user}
				hike={hike}
				getUserHikeRecord={props.getUserHikeRecord}
				setUserHikeRecord={props.setUserHikeRecord}
				userRecord={props.userHikeRecord}
				thisHikeIsStarted={props.userHikeRecord && props.userHikeRecord.hikeID == hike.hikeID }
				otherHikeIsStarted={props.userHikeRecord && props.userHikeRecord.hikeID != hike.hikeID }
				setHikes={props.setHikes}
				handleEditForm={handleShowEditForm}
			/>
		</Col>
	));

	return (
		<Row>
			{!props.suggested &&
				<Col lg={3} className="d-none d-xl-block">
					{RoleManagement.isLocalGuide(props.user) ? (
						<Row className="mb-1">{props.insertButton}</Row>
					) : (
						false
					)}
					{props.user ? <Row>
						<Button className="mb-3" onClick={() => {
							props.applyPreferences();
						}}>I'm feeling adventurous!</Button>
					</Row> : false}
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
									hikes={props.hikes}
									filters={props.filters}
									setFilters={props.setFilters}
								/>
							</Container>
						</Card>
					</Row>
				</Col>
			}

			<Col className="mb-5">
				Your hike in progress / Let's start a new hike!
			<hr/>
				<Row xs={1} md={2} xl={3} className="d-flex align-items-center">
					{shownHikes.length === 0 ? <EmptySearch /> : shownHikes}
				</Row>
			</Col>
		</Row>
	);
}

function HikeListItem(props) {
	const [showHikeModal, setShowHikeModal] = useState(false);
	const [customDateTime, setCustomDateTime] = useState(dayjs());
	const handleStartHike = async () => {
		// setShowHikeModal(false);
		await HikeRecordsAPI.addNewRecord({ userID: props.user.userID, hikeID: props.hike.hikeID, startDate: dayjs().format("YYYY-MM-DD HH:mm:ss") })
			.then(() => {
				props.getUserHikeRecord();
				setCustomDateTime(dayjs());
			})
			.catch((err) => console.log(err));
	};

	const handleStopHike = async () => {
		let record = props.userRecord;
		record.endDate = dayjs(customDateTime).format("YYYY-MM-DD HH:mm:ss");
		await HikeRecordsAPI.updateRecord(record)
			.then(() => {
				props.setUserHikeRecord(null);
				setCustomDateTime(dayjs());
			})
			.catch((err) => console.log(err));
	};

	const handleCloseHikeModal = () => {
		setShowHikeModal(false);
	};

	const handleShowHikeModal = () => {
		setShowHikeModal(true);
	};

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

	return (
		<>
			{<HikeModal
				show={showHikeModal}
				hike={props.hike}
				user={props.user}
				userRecord={props.userRecord}
				thisHikeIsStarted = {props.thisHikeIsStarted}
				otherHikeIsStarted = {props.otherHikeIsStarted}
				customDateTime={customDateTime}
				setCustomDateTime={setCustomDateTime}
				handleStartHike={handleStartHike}
				handleStopHike={handleStopHike}
				onClose={() => handleCloseHikeModal()}
				onDelete={() => handleDeleteHike(props.hike)}
				onEdit={() => props.handleEditForm(props.hike)}
				onStart={() => { }} />}

			<Col className="mt-3">
				<Card>
					<Card.Body>
						<Card.Title>
							<Row className="top-row">
								<Col xs={8} sm={9}>
									{props.hike.title.length > 25 ? props.hike.title.trim().slice(0, 24).concat("...") : props.hike.title}
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
