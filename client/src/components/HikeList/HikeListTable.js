import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import HikeAPI from "../../api/HikeAPI";
import PointAPI from "../../api/PointAPI";
import HikeRecordsAPI from "../../api/HikeRecordsAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";

import { HikeModal } from "./HikeModal";
import { EmptySearch } from "../EmptySearch";

import { HikeFilters } from "./HikeFilters";
import "../../styles/HikeListTable.css";
import RoleManagement from "../../class/RoleManagement";

import { HikeMap } from "../Maps/HikeMap";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { HikeStats } from "./HikeStats";
const dayjs = require("dayjs");

function HikeListTable(props) {
	const [hikeInProgress, setHikeInProgress] = useState(undefined);
	const [trackInProgress, setTrackInProgress] = useState(undefined);
	const [markers, setMarkers] = useState({});

	let handleShowEditForm = (hike) => {
		props.setSelectedHike(hike);
		props.showHikeForm();
	};

	const [customDateTime, setCustomDateTime] = useState(dayjs());
	let selectCustomDateTime = function (newValue) {
		setCustomDateTime(newValue);
	};
	let render = function (params) {
		return <TextField {...params} />;
	};
	let minDateTime =
		props.userRecord && props.userRecord.length > 0
			? dayjs(props.userRecord[0].startDate)
			: dayjs();

	let handleStopHike = async function () {
		let record = props.userHikeRecord;
		record.endDate = dayjs(customDateTime).format("YYYY-MM-DD HH:mm:ss");
		await HikeRecordsAPI.updateRecord(record)
			.then(() => {
				props.setUserHikeRecord(undefined);
				setCustomDateTime(dayjs());
			})
			.catch((err) => console.log(err));
	};

	let shownHikes = props.shownHikes.map((hike) => (
		<Col key={hike.hikeID}>
			<HikeListItem
				user={props.user}
				hike={hike}
				getUserHikeRecord={props.getUserHikeRecord}
				setUserHikeRecord={props.setUserHikeRecord}
				userRecord={props.userHikeRecord}
				thisHikeIsStarted={
					props.userHikeRecord && props.userHikeRecord.hikeID == hike.hikeID
				}
				otherHikeIsStarted={
					props.userHikeRecord && props.userHikeRecord.hikeID != hike.hikeID
				}
				setHikes={props.setHikes}
				handleEditForm={handleShowEditForm}
				handleStopHike={handleStopHike}
				customDateTime={customDateTime}
				setCustomDateTime={setCustomDateTime}
			/>
		</Col>
	));

	useEffect(() => {
		if (!props.userHikeRecord) {
			setHikeInProgress(undefined);
			return;
		}

		HikeAPI.getHike(props.userHikeRecord.hikeID).then((hike) => {
			setHikeInProgress(hike);
			getMarkers(hike);
		});

		HikeAPI.getHikeTrack(props.userHikeRecord.hikeID).then((track) => {
			console.log(track);
			setTrackInProgress(track);
		});
	}, [props.userHikeRecord]);

	let getMarkers = async (hike) => {
		let start = await PointAPI.getPoint(hike.startPointID);
		let end = await PointAPI.getPoint(hike.endPointID);

		let referencePoints = await HikeAPI.getHikePoints(hike.hikeID);
		let linkedHuts = await HikeAPI.getLinkedHuts(hike.hikeID);
		let huts = await HikeAPI.getCloseHuts(hike.hikeID).then((h) =>
			h.filter((p) => linkedHuts.includes(p.pointID))
		);

		setMarkers({
			start: start
				? {
						pointID: start.pointID,
						name: start.name,
						latitude: start.lat,
						longitude: start.lon,
				  }
				: null,
			end: end
				? {
						pointID: end.pointID,
						name: end.name,
						latitude: end.lat,
						longitude: end.lon,
				  }
				: null,
			referencePoints: referencePoints,
			linkedHuts: huts,
		});
	};

	let selectFilters = function (ev) {
		props.setFilters({
			...props.filters,
			title: ev.target.value.trim(),
		});
	};
	let applyPrefs = function () {
		props.applyPreferences();
	};
	let stop = function () {
		handleStopHike();
	};

	return (
		<Row>
			{!props.suggested && (
				<Col lg={3} className="d-none d-xl-block">
					{RoleManagement.isLocalGuide(props.user) ? (
						<Row className="mb-1">{props.insertButton}</Row>
					) : (
						false
					)}
					{props.user ? (
						<Row>
							<Button className="mb-3" onClick={applyPrefs}>
								I'm feeling adventurous!
							</Button>
						</Row>
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
									onChange={selectFilters}
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
			)}

			<Col className="mb-5">
				{RoleManagement.isHiker(props.user) ||
				RoleManagement.isLocalGuide(props.user)
					? <>
					{hikeInProgress && props.userHikeRecord ? (
						<Card className="mt-2">
							<Card.Body>
								<Card.Title>{hikeInProgress.title}</Card.Title>
								<HikeStats hike={hikeInProgress} />
								<Container className="mt-2">
									<HikeMap
										track={trackInProgress}
										markers={markers}
										user={props.user}
									/>
									<Row className="text-muted mt-1">Start time</Row>
									<Row>{props.userHikeRecord.startDate}</Row>
									{RoleManagement.isHiker(props.user) &&
										props.userHikeRecord &&
										props.userHikeRecord.hikeID == hikeInProgress.hikeID && (
											<Row className="text-center" style={{ marginTop: "10px" }}>
												<Col>
													<LocalizationProvider dateAdapter={AdapterDayjs}>
														<DateTimePicker
															label="Manual Clock"
															renderInput={render}
															value={customDateTime}
															onChange={selectCustomDateTime}
															minDateTime={minDateTime}
														/>
													</LocalizationProvider>
												</Col>
											</Row>
										)}
								</Container>
							</Card.Body>
							<Card.Footer>
								<Row>
									<Col>Hike in progress</Col>
									<Col className="text-end">
										<Button size="sm" variant="danger" onClick={stop}>
											Terminate hike
										</Button>
									</Col>
								</Row>
							</Card.Footer>
						</Card>
					) : (
						<Row className="text-center mt-5">
							<Col>Choose your next adventure and hit the Start button!</Col>
						</Row>
					)}
					<hr />
				</>
					: false}
				<Row xs={1} md={2} xl={3} className="d-flex align-items-center">
					{shownHikes.length === 0 ? <EmptySearch /> : shownHikes}
				</Row>
			</Col>
		</Row>
	);
}

function HikeListItem(props) {
	const [showHikeModal, setShowHikeModal] = useState(false);

	let handleStartHike = async function () {
		await HikeRecordsAPI.addNewRecord({
			userID: props.user.userID,
			hikeID: props.hike.hikeID,
			startDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
		})
			.then(() => {
				props.getUserHikeRecord();
				props.setCustomDateTime(dayjs());
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
			{
				<HikeModal
					show={showHikeModal}
					hike={props.hike}
					user={props.user}
					userRecord={props.userRecord}
					thisHikeIsStarted={props.thisHikeIsStarted}
					otherHikeIsStarted={props.otherHikeIsStarted}
					customDateTime={props.customDateTime}
					setCustomDateTime={props.setCustomDateTime}
					handleStartHike={handleStartHike}
					handleStopHike={props.handleStopHike}
					onClose={handleCloseHikeModal}
					onDelete={() => handleDeleteHike(props.hike)}
					onEdit={() => props.handleEditForm(props.hike)}
				/>
			}

			<Col className="mt-3">
				<Card>
					<Card.Body>
						<Card.Title>
							<Row className="top-row">
								<Col xs={8} sm={9}>
									{props.hike.title.length > 25
										? props.hike.title.trim().slice(0, 24).concat("...")
										: props.hike.title}
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
							<HikeStats hike={props.hike} />
						</Container>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
}

export default HikeListTable;
