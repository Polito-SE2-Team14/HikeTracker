import { Container, Button, Row, Col, Form, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ParkingLotAPI from "../api/ParkingLotAPI";
import PLotListTable from "../components/ParkingLotList/PLotListTable";
import { Loading } from "../components/Loading";
import { NewPLotForm } from "../components/ParkingLotList/PLotInsertModule";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import RoleManagement from "../class/RoleManagement";
import { ParkingLotFilters } from "../components/ParkingLotList/PLotFilters";

import { isInArea } from "../components/HikeData";

export function ParkingLotsPage(props) {
	const [loading, setLoading] = useState(true);
	const [lots, setLots] = useState([]);
	const [filteredLosts, setFilteredLots] = useState([]);
	const [showLotForm, setShowLotForm] = useState(false);

	const [showFilterForm, setShowFilterForm] = useState(false);

	const [filters, setFilters] = useState({
		name: "",
		address: "",
		area: null,
		country: "",
		province: "",
		municipality: "",
		carspace: [],
	});

	const getAllParkingLots = async function (){
		await ParkingLotAPI.getAllParkingLots()
			.catch((err) => {
				console.error(err);
				throw err;
			})
			.then((lots) => {
				setLots(lots);
				setFilteredLots(applyFilters(lots, filters));
				setLoading(false);
			});
	};

	const handleShowLotForm =function(){
		setShowLotForm(true);
	};

	const handleHideLotForm =function(){
		setShowLotForm(false);
	};

	let handleShowFilterModal =function(){
		setShowFilterForm(true);
	};

	let handleCloseFilterModal =function(){
		setShowFilterForm(false);
	};

	let addPlot = async function(newLot){
		newLot.creatorID = props.user.userID;

		await ParkingLotAPI.addParkingLot(newLot)
			.then(() => {
				setLots((lots) => [...lots, newLot]);
			})
			.catch((err) => {
				throw err;
			});
	};

	useEffect(() => {
		getAllParkingLots();
	}, [lots.length]);

	useEffect(() => {
		setFilteredLots(applyFilters(lots, filters));
		// eslint-disable-next-line
	}, [filters]);

	const insertButton = (
		<Button variant="success" onClick={handleShowLotForm}>
			<FontAwesomeIcon icon={faPlus} /> Add new parking lot
		</Button>
	);
	
	let selectFilters = function(ev){setFilters({ ...filters, name: ev.target.value.trim() })}

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container className="mb-4">
					<h1 className="mt-3 text-center">Parking Lots</h1>
					<Row className="mt-3 d-xl-none">
						<Col>
							<Form className="d-flex">
								<Form.Control
									type="search"
									placeholder="Search"
									value={filters.name}
									onChange={selectFilters}
								/>
								<Button onClick={handleShowFilterModal}>
									<FontAwesomeIcon icon={faFilter} />
								</Button>
							</Form>
						</Col>

						{RoleManagement.isLocalGuide(props.user) ? (
							<Col className="text-end">{insertButton}</Col>
						) : (
							false
						)}
					</Row>

					<Modal show={showFilterForm} onHide={handleCloseFilterModal}>
						<Modal.Header closeButton>
							<Modal.Title>Filter</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<ParkingLotFilters lots={lots} filters={filters} setFilters={setFilters} />
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleCloseFilterModal}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>

					<NewPLotForm
						addPlot={addPlot}
						show={showLotForm}
						onHide={handleHideLotForm}
						setLots={setLots}
					/>

					<PLotListTable
						lots={lots}
						shownParkingLots={filteredLosts}
						setLots={setLots}
						user={props.user}
						filters={filters}
						setFilters={setFilters}
						insertButton={insertButton}
					/>
				</Container>
			)}
		</>
	);
}

function applyFilters(lots, filters) {
	const checkCarspace = (lot) => {
		if (filters.carspace.length === 0) return true;

		return (
			lot.carspace >= filters.carspace[0] && lot.carspace <= filters.carspace[1]
		);
	};

	const checkArea = (lot) => {
		if (!filters.area) {
			return true;
		}

		return isInArea(lot, filters.area);
	};

	return lots.filter(
		(lot) =>
			lot.name.toLowerCase().startsWith(filters.name.toLowerCase()) &&
			lot.country.toLowerCase().startsWith(filters.country.toLowerCase()) &&
			lot.province.toLowerCase().startsWith(filters.province.toLowerCase()) &&
			lot.municipality
				.toLowerCase()
				.startsWith(filters.municipality.toLowerCase()) &&
			checkArea(lot) &&
			lot.address.toLowerCase().includes(filters.address.toLowerCase()) &&
			checkCarspace(lot)
	);
}
