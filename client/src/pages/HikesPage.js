import { Container, Modal, Button, Row, Col, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import HikeAPI from "../api/HikeAPI";
import UserAPI from "../api/UserAPI";
import HikeRecordsAPI from "../api/HikeRecordsAPI";
import HikeListTable from "../components/HikeList/HikeListTable";
import { filterAllHikes } from "../components/HikeList/filtering_functions";
import { Loading } from "../components/Loading";
import { HikeEditForm } from "../components/HikeList/HikeEditForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";
import { HikeFilters } from "../components/HikeList/HikeFilters";

// Role Management
import RoleManagement from "../class/RoleManagement";

export function HikesPage(props) {
	const [loading, setLoading] = useState(true);

	const [userStats, setUserStats] = useState(null);
	const [hikes, setHikes] = useState([]);
	const [userHikeRecord, setUserHikeRecord] = useState(null);
	const [filteredHikes, setFilteredHikes] = useState([]);
	const [showFilterForm, setshowFilterForm] = useState(false);
	const [filters, setFilters] = useState({
		title: "",
		area: {},
		country: "",
		province: "",
		municipality: "",
		difficulties: [],
		length: [],
		ascent: [],
		expectedTime: [],
	});

	const [selectedHike, setSelectedHike] = useState(null);
	const [showHikeForm, setShowHikeForm] = useState(false);

	let getAllHikes = async function () {
		let hikes;
		await HikeAPI.getAllHikes()
			.then((h) => {
				hikes = h;
				setHikes(hikes);
				setFilteredHikes(hikes);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	let getUserHikeRecordWithStatusOpen = async function () {
		if (props.user && props.user.userID) {
			await HikeRecordsAPI.getHikeRecordForUserWithStatusOpen(props.user.userID)
				.then((h) => {
					setUserHikeRecord(h);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	let handleClose = function () {
		setshowFilterForm(false);
	};

	let handleShowHikeForm = function () {
		setShowHikeForm(true);
	};

	let handleCloseHikeForm = function () {
		setShowHikeForm(false);
		setSelectedHike(null);
	};

	let newHike = async function (hike) {
		let insertedHike;
		hike.creatorID = props.user.userID;
		await HikeAPI.newHike(hike)
			.then(
				(h) =>
					(insertedHike = {
						...h,
						creatorID: props.user.userID,
						creatorName: props.user.name,
						creatorSurname: props.user.surname,
					})
			)
			.catch((e) => {
				console.error(e);
			});

		return insertedHike;
	};

	let applyPreferences = async function () {
		let stats = await UserAPI.getUserStats();
		let newFilters = {
			title: "",
			area: {},
			country: "",
			province: "",
			municipality: "",
			difficulties: [],
			length: [],
			ascent: [],
			expectedTime: [],
		};

		let hikes;
		await HikeAPI.getAllHikes()
			.then((h) => {
				if (stats) {
					hikes = h;

/* 					hikes.filter((hike) => {
						return hike.difficulty === stats.favouriteDifficulty &&
							hike.country === stats.favouriteCountry &&
							hike.province === stats.favouriteProvince &&
							hike.expectedTime >= stats.minTime &&
							hike.expectedTime <= stats.maxtime &&
							hike.ascent >= stats.minAscent &&
							hike.ascent <= stats.maxAscent &&
							hike.length >= stats.minDistance &&
							hike.length <= stats.maxDistance
					}); */

					let suggested = hikes.filter(
						(hike) => hike.difficulty === stats.favouriteDifficulty
					);

					if (suggested.length > 0) {
						hikes = suggested;
						newFilters.difficulties.push(stats.favouriteDifficulty);
					}

					suggested = hikes.filter(
						(hike) =>
							hike.country === stats.favouriteCountry &&
							hike.province === stats.favouriteProvince
					);

					if (suggested.length > 0) {
						hikes = suggested;

						newFilters.country = stats.favouriteCountry;
						newFilters.province = stats.favouriteProvince;
					}

					suggested = hikes.filter(
						(hike) =>
							hike.expectedTime >= stats.minTime &&
							hike.expectedTime <= stats.maxtime
					);

					if (suggested.length > 0) {
						hikes = suggested;

						newFilters.expectedTime.push(stats.minTime);
						newFilters.expectedTime.push(stats.maxTime);
					}

					suggested = hikes.filter(
						(hike) =>
							hike.ascent >= stats.minAscent && hike.ascent <= stats.maxAscent
					);

					if (suggested.length > 0) {
						hikes = suggested;

						newFilters.ascent.push(stats.minAscent);
						newFilters.ascent.push(stats.maxAscent);
					}

					suggested = hikes.filter(
						(hike) =>
							hike.length >= stats.minDistance &&
							hike.length <= stats.maxDistance
					);

					if (suggested.length > 0) {
						hikes = suggested;

						newFilters.length.push(stats.minDistance);
						newFilters.length.push(stats.maxDistance);
					}

					setFilters(newFilters);
				}

				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getAllHikes();
		getUserHikeRecordWithStatusOpen();
	}, [hikes.length]);

	async function updateFilters() {
		let filtered = await filterAllHikes(hikes, filters);
		setFilteredHikes(filtered);
	}

	useEffect(() => {
		updateFilters();
	}, [filters, hikes]);

	let selectFilters = function (ev) {
		setFilters({ ...filters, title: ev.target.value.trim() });
	};
	let showFilterFormTrue = function () {
		setshowFilterForm(true);
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container>
					<h1 className="mt-3 text-center">Hikes</h1>
					<Row className="mt-3 d-xl-none">
						<Col className="d-inline-flex">
							<Form.Control
								type="search"
								placeholder="Search"
								value={filters.title}
								onChange={selectFilters}
							/>
							<Button onClick={showFilterFormTrue}>
								<FontAwesomeIcon icon={faFilter} />
							</Button>
						</Col>
						{RoleManagement.isLocalGuide(props.user) ? (
							<Col xs={4} className="text-end">
								<InsertHikeButton />
							</Col>
						) : (
							false
						)}
					</Row>
					<Modal show={showFilterForm} onHide={handleClose}>
						<Modal.Header closeButton>
							<Modal.Title>Filter</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<HikeFilters
								hikes={hikes}
								filters={filters}
								setFilters={setFilters}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>

					<HikeEditForm
						show={showHikeForm}
						hike={selectedHike}
						onHide={handleCloseHikeForm}
						setHikes={setHikes}
						newHike={newHike}
						user={props.user}
					/>

					<HikeListTable
						hikes={hikes}
						shownHikes={filteredHikes}
						userHikeRecord={userHikeRecord}
						getUserHikeRecord={getUserHikeRecordWithStatusOpen}
						setUserHikeRecord={setUserHikeRecord}
						setHikes={setHikes}
						filters={filters}
						setFilters={setFilters}
						selectedHike={selectedHike}
						setSelectedHike={setSelectedHike}
						insertButton={
							<InsertHikeButton handleShowHikeForm={handleShowHikeForm} />
						}
						showHikeForm={handleShowHikeForm}
						user={props.user}
						applyPreferences={applyPreferences}
					/>
				</Container>
			)}
		</>
	);
}

function InsertHikeButton(props) {
	return (
		<Button variant="success" onClick={props.handleShowHikeForm}>
			<FontAwesomeIcon icon={faPlus} /> Insert Hike
		</Button>
	);
}
