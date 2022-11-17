import { Container, Modal, Button, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import HikeAPI from "../api/HikeAPI";
import HikeListTable from "../components/HikeList/HikeListTable";
import { FilterForm } from "../components/filteringForm";
import { filterHike, filterAllHikes } from "../components/filtering_functions";
import { Loading } from "../components/Loading";
import { HikeEditForm } from "../components/HikeList/HikeEditForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faFilter } from "@fortawesome/free-solid-svg-icons";

export function HikesPage(props) {
	const [loading, setLoading] = useState(true);

	const [hikes, setHikes] = useState([]);
	const [filteredHikes, setFilteredHikes] = useState([]);
	const [showFilterForm, setshowFilterForm] = useState(false);
	const [filters, setFilters] = useState({});

	const [selectedHike, setSelectedHike] = useState(null);
	const [showHikeForm, setShowHikeForm] = useState(false);

	const getAllHikes = async () => {
		try {
			const hikes = await HikeAPI.getAllHikes();
			setHikes(hikes);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClose = () => {
		setshowFilterForm(false);
	};

	const handleShowHikeForm = () => {
		setShowHikeForm(true);
	};

	const handleCloseHikeForm = () => {
		setShowHikeForm(false);
	};

	useEffect(() => {
		getAllHikes();
	}, [hikes.length]);

	useEffect(() => {
		console.log(filters);
		for (let hike of hikes) {
			console.log(filterHike(hike, filters));
		}
		setHikes(filterAllHikes(hikes, filters));
	}, [filters]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container>
					<Row className="mt-3">
						<Col>
							<Button
								onClick={() => {
									setshowFilterForm(true);
								}}
							>
								<FontAwesomeIcon icon={faFilter} /> Apply filters
							</Button>
						</Col>
						{props.user.type === "Local guide" ? (
							<Col className="text-end">
								<Button variant="success" onClick={handleShowHikeForm}>
									<FontAwesomeIcon icon={faPlus} /> New Hike
								</Button>
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
							<FilterForm
								filters={filters}
								setFilters={setFilters}
							></FilterForm>
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
					/>
					<HikeListTable
						hikes={hikes}
						setHikes={setHikes}
						setSelectedHike={setSelectedHike}
						showHikeForm={handleShowHikeForm}
						user={props.user}
					/>
				</Container>
			)}
		</>
	);
}
