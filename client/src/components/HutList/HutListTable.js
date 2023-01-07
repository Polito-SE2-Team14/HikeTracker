import { useState } from "react";
import { Card, Col, Row, Button, Form, Container } from "react-bootstrap";
import {
	faBed,
	faCity,
	faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HutModal } from "./HutModal";

import PointAPI from "../../api/PointAPI";
import { EmptySearch } from "../EmptySearch";

import { HutFilters } from "./HutFilters";
import RoleManagement from "../../class/RoleManagement";

import "../../styles/HutListTable.css"

export function HutListTable(props) {
	let shownHuts = props.shownHuts.map((hut) => (
		<Col key={hut.pointID}>
			<HutListItem user={props.user} hut={hut} setHuts={props.setHuts} />
		</Col>
	));

	let selectFilters=function(ev){
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
								<HutFilters
									huts={props.huts}
									filters={props.filters}
									setFilters={props.setFilters}
								/>
							</Row>
						</Container>
					</Card>
				</Row>
			</Col>
			<Col>
				<Row xs={1} md={2} xl={3} className="d-flex align-items-center">
					{props.huts.length === 0 ? <EmptySearch /> : shownHuts}
				</Row>
			</Col>
		</Row>
	);
}
function HutListItem(props) {
	const [showHutModal, setShowHutModal] = useState(false);

	let handleCloseHutModal = function() {
		setShowHutModal(false);
	};

	let handleShowHutModal = function() {
		setShowHutModal(true);
	};

	let handleDeleteHut = async function() {
		await PointAPI.deleteHut(props.hut.pointID);
		props.setHuts((old) => old.filter((h) => h.pointID != props.hut.pointID));
		setShowHutModal(false);
	};

	return (
		<>
			<HutModal
				show={showHutModal}
				hut={props.hut}
				user={props.user}
				onClose={handleCloseHutModal}
				onDelete={handleDeleteHut}
			/>

			<Col className="mt-3">
				<Card>
					<Card.Body>
						<Card.Title>
							<Row className="top-row">
								<Col xs={8} sm={9}>
									{props.hut.name.length>25 ? props.hut.name.trim().slice(0, 24).concat("..."): props.hut.name}
								</Col>
								<Col className="text-end">
									<Button
										size="sm"
										variant="secondary"
										onClick={handleShowHutModal}
									>
										<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
									</Button>
								</Col>
							</Row>
						</Card.Title>
						<Row className="bottom-row">
							<Col>
								<FontAwesomeIcon icon={faCity} />{" "}
								{` ${props.hut.municipality} (${props.hut.province})`}
							</Col>
							<Col xs={4}>
								<FontAwesomeIcon icon={faBed} /> {props.hut.bedspace}
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
}
