import { Container, Button, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ParkingLotAPI from "../api/ParkingLotAPI";
import PLotListTable from "../components/ParkingLotList/PLotListTable";
import { Loading } from "../components/Loading";
import { NewPLotForm } from "../components/ParkingLotList/PLotInsertModule";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RoleManagement from "../class/RoleManagement";

export function ParkingLotsPage(props) {
	const [loading, setLoading] = useState(true);
	const [lots, setLots] = useState([]);
	const [showLotForm, setShowLotForm] = useState(false);

	const getAllParkingLots = async () => {
		let allLots;
		await ParkingLotAPI.getAllParkingLots()
			.catch((err) => {
				console.error(err);
				throw err;
			})
			.then((lots) => {
				allLots = lots;
				setLots(allLots);
				setLoading(false);
			});
	};

	const handleShowLotForm = () => {
		setShowLotForm(true);
	};

	const handleHideLotForm = () => {
		setShowLotForm(false);
	};

	const addPlot = async (newLot) => {
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

	const insertButton = () => {
		return (
			<Button variant="success" onClick={handleShowLotForm}>
				<FontAwesomeIcon icon={faPlus} /> Add new parking lot
			</Button>
		);
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container>
					<h1 className="mt-3">Parking Lots</h1>
					<Row className="mt-3">
						{RoleManagement.isLocalGuide(props.user) ? (
							<Col className="text-end">{insertButton}</Col>
						) : (
							false
						)}
					</Row>

					<NewPLotForm
						addPlot={addPlot}
						show={showLotForm}
						onHide={handleHideLotForm}
						setLots={setLots}
					/>

					<PLotListTable lots={lots} setLots={setLots} />
				</Container>
			)}
		</>
	);
}
