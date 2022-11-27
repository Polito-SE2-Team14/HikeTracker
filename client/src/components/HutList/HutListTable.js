import { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import {
	faBed,
	faCity,
	faMap,
	faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HutModal } from "./HutModal";

import PointAPI from "../../api/PointAPI";

export function HutListTable(props) {
	return (
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
								<Col sm={9}>{props.hut.name}</Col>
								<Col className="text-end">
									<Button
										size="sm"
										variant="outline-secondary"
										onClick={handleShowHutModal}
									>
										<FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
									</Button>
								</Col>
							</Row>
						</Card.Title>
						<Row>
							<Col>
								
								<FontAwesomeIcon icon={faCity} /> {` ${props.hut.municipality} (${props.hut.province})`}
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
