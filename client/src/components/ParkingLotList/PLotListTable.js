import { Button, Card, Row, Col, Container, Form } from "react-bootstrap";
import React, { useState } from "react";
import ParkingLotAPI from "../../api/ParkingLotAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCar,
	faMap,
	faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";

import { PLotModal } from "./PLotModal";
import { ParkingLotFilters } from "./PLotFilters";
import RoleManagement from "../../class/RoleManagement";
import { EmptySearch } from "../EmptySearch";

function PLotListTable(props) {
	let shownParkingLots = props.shownParkingLots.map((lot, i) => (
		<div key={lot.name}>
			<PLotListItem lot={lot} setLots={props.setLots} />
		</div>
	));

	let selectFilters = function(ev){
		props.setFilters({
			...props.filters,
			name: ev.target.value.trim(),
			})
		}
	return (
		<Row>
			<Col lg={3} className="d-none d-xl-block">
				{RoleManagement.isLocalGuide(props.user) ? (
					<Row className="mb-3 mt-3">{props.insertButton}</Row>
				) : (
					false
				)}
				<Row>
					<Card className="p-2">
						<h3>Filters</h3>
						<Container>
							<Row>
								<h5>Name</h5>
								<Form.Control
									type="search"
									placeholder="Search"
									value={props.filters.name}
									onChange={selectFilters}
								/>
							</Row>
							<Row className="mt-4">
								<ParkingLotFilters
								lots={props.lots}
									filters={props.filters}
									setFilters={props.setFilters}
								/>
							</Row>
						</Container>
					</Card>
				</Row>
			</Col>

			<Col>
				<Row xs={1} md={2} xl={3} className="d-flex align-items-center mb-5">
					{props.lots.length === 0 ? <EmptySearch /> : shownParkingLots}
				</Row>
			</Col>
		</Row>
	);
}

function PLotListItem(props) {
	const [showModal, setShowModal] = useState(false);

	let handleShowModal = function(){
		setShowModal(true);
	};
	let handleHideModal = function(){
		setShowModal(false);
	};
	let handleDeletePLot = function(){
		setShowModal(false);
		ParkingLotAPI.deleteParkingLot(props.lot.pLotId)
			.then(() => {
				props.setLots((old) =>
					old.filter((oldLot) => oldLot.pLotId !== props.lot.pLotId)
				);
			})
			.catch((err) => console.log(err));
	};
	return (
		<>
			<PLotModal
				lot={props.lot}
				show={showModal}
				onHide={handleHideModal}
				onDelete={handleDeletePLot}
			/>
			<Col className="mt-3">
				<Card>
					<Card.Body>
						<Card.Title>
							<Row>
								<Col xs={8} sm={9}>
									{props.lot.name.length > 25 ? props.lot.name.slice(0, 24).concat("...") : props.lot.name}
								</Col>
								<Col className="text-end">
									<Button
										size="sm"
										variant="secondary"
										onClick={handleShowModal}
									>
										<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
									</Button>
								</Col>
							</Row>
						</Card.Title>
						<Container>
							<Row>
								<Col>
									<FontAwesomeIcon icon={faMap} />{" "}
									{`${props.lot.municipality} (${props.lot.province})`}
								</Col>
								<Col>
									<FontAwesomeIcon icon={faCar} />{" "}
									{`${props.lot.carspace} spaces`}
								</Col>
							</Row>
						</Container>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
}
export default PLotListTable;
