import { Container, Modal, Button, Row, Col, ModalBody } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ParkingLotAPI from "../api/ParkingLotAPI";
import PLotListTable from "../components/ParkingLotList/HikeListTable";
import { Loading } from "../components/Loading";
import { NewPLotForm } from "../components/ParkingLotList/PLotInsertModule";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";



export function ParkingLotsPage(props) {
	const [loading, setLoading] = useState(true);
	const [lots, setLots] = useState([]);
	const [selectedLot, setSelectedLot] = useState(null);
	const [showLotForm, setShowLotForm] = useState(false);

	const getAllParkingLots = async() => {
		try{
			let allLots=await ParkingLotAPI.getAllParkingLots();
			setLots(allLots);
			setLoading(false);
		}catch(err){
			throw(err);
		}
	};

	const handleShowLotForm=()=>{
		setShowLotForm(true);
	}

	const handleHideLotForm=()=>{
		setShowLotForm(false);
	}

	useEffect(()=>{
		getAllParkingLots();
	}, [lots.length]);

	return (
	<>
		{loading ? 
			<Loading/>
		:
			<Container>
				<Row className="mt-3">
					{
						props.user.type === "Local guide"?
						<Col className="text-end">
							<Button variant="success" onClick={handleShowLotForm}>
								<FontAwesomeIcon icon={faPlus} /> Add new parking lot
							</Button>
						</Col>
						:
						<></>
					}
				</Row>
				
				<NewPLotForm
					show={showLotForm}
					onHide={handleHideLotForm}
					setLots={setLots}
				/>

				<PLotListTable
					lots={lots}
					setLots={setLots}
				/>
			</Container>
		}
	</>);
}
