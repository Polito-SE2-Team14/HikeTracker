import { useState } from "react";
import { Card, Col, Row, Button, Form, Container } from "react-bootstrap";
import {
	faBed,
	faCity,
	faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HutModal } from "./HutModal";
import { SideHutFilter } from "./SideHutFilter";

import PointAPI from "../../api/PointAPI";
import { EmptySearch } from "../EmptySeach";

export function HutListTable(props) {
	return props.huts.length === 0 ? (
		<EmptySearch />
	) : (
		<Row>
			<Col lg={3} className="d-none d-xl-block">
				<Card className="p-2">
					<h3>Filters</h3>
					<Container>
					<h5>Name</h5>
					<Form.Control
									type="search"
									placeholder="Search"
									/* value={filters.name}
									onChange={(ev) =>
										setFilters({ ...filters, name: ev.target.value.trim() })
									} */
								/>
					<hr/>
					<SideHutFilter />
					</Container>
				</Card>
			</Col>
			<Col>
				<Row xs={1} md={2} xl={3} className="d-flex align-items-center">
					{props.huts.map((hut, i) => (
						<HutListItem
							key={i}
							user={props.user}
							hut={hut}
							setHuts={props.setHuts}
						/>
					))}
				</Row>
			</Col>
		</Row>
	);
}
function HutListItem(props) {
	const [showHutModal, setShowHutModal] = useState(false);

	const handleCloseHutModal = () => {
		setShowHutModal(false);
	};

	const handleShowHutModal = () => {
		setShowHutModal(true);
	};

	const handleDeleteHut = async () => {
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
				onClose={() => handleCloseHutModal()}
				onDelete={() => handleDeleteHut()}
			/>

			<Col className="mt-3">
				<Card>
					<Card.Body>
						<Card.Title>
							<Row>
								<Col xs={8} sm={9}>
									{props.hut.name}
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
						<Row>
							<Col>
								<FontAwesomeIcon icon={faCity} />{" "}
								{` ${props.hut.municipality} (${props.hut.province})`}
							</Col>
							<Col xs={4}>
								<FontAwesomeIcon icon={faBed} /> {props.hut.bedspace}
							</Col>
						</Row>
						<Row>
							<Col>
								{`by ${props.hut.creatorSurname} ${props.hut.creatorName} `}
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
}
