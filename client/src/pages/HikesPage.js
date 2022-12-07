import { Container, Modal, Button, Row, Col, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import HikeAPI from "../api/HikeAPI";
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

	const [hikes, setHikes] = useState([]);
	const [filteredHikes, setFilteredHikes] = useState([]);
	const [showFilterForm, setshowFilterForm] = useState(false);
	const [filters, setFilters] = useState({
		title: "",
		area: {},
		difficulties: [],
		length: [],
		ascent: [],
		expectedTime: [],
	});

	const [selectedHike, setSelectedHike] = useState(null);
	const [showHikeForm, setShowHikeForm] = useState(false);

	const getAllHikes = async () => {
		let hikes
		await HikeAPI.getAllHikes()
			.then(h => {
				hikes = h
				setHikes(hikes);
				setFilteredHikes(hikes);
				setLoading(false);
			})
			.catch((error) => { console.log(error); })
		
};

	const handleClose = () => {
		setshowFilterForm(false);
	};

	const handleShowHikeForm = () => {
		setShowHikeForm(true);
	};

	const handleCloseHikeForm = () => {
		setShowHikeForm(false);
		setSelectedHike(null);
	};

	const newHike = async (hike) => {
		let insertedHike;
		hike.creatorID = props.user.userID;
		await HikeAPI.newHike(hike)
			.then((h) => (insertedHike = h))
			.catch((e) => {
				// TODO(antonio): error handling
				console.error(e);
			});

		return insertedHike;
	};

	useEffect(() => {
		getAllHikes();
	}, [hikes.length]);

	useEffect(() => {
		//setHikes(filterAllHikes(hikes, filters));
		setFilteredHikes(filterAllHikes(hikes, filters));
	}, [filters]);

	function InsertHikeButton() {
		return (
			<Button variant="success" onClick={handleShowHikeForm}>
				<FontAwesomeIcon icon={faPlus} /> Insert Hike
			</Button>
		);
	}

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
								onChange={(ev) =>
									setFilters({ ...filters, title: ev.target.value.trim() })
								}
							/>
							<Button
								onClick={() => {
									setshowFilterForm(true);
								}}
							>
								<FontAwesomeIcon icon={faFilter} />
							</Button>
						</Col>
						{RoleManagement.isLocalGuide(props.userType) ? (
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
							<HikeFilters filters={filters} setFilters={setFilters} />
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
						hikes={filteredHikes}
						setHikes={setHikes}
						filters={filters}
						setFilters={setFilters}
						selectedHike={selectedHike}
						setSelectedHike={setSelectedHike}
						insertButton={<InsertHikeButton />}
						showHikeForm={handleShowHikeForm}
						user={props.user}
					/>
				</Container>
			)}
		</>
	);
}
