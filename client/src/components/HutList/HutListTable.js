import { useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { faBed, faMap, faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HutModal } from "./HutModal";

export function HutListTable(props) {
	return (
		<Row xs={1} md={2} xl={3} className="d-flex align-items-center">
			{props.huts.map((hut, i) => (
				<HutListItem
					key={i}
					user={props.user}
					hut={hut}
					setHuts={props.setHuts} />
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

	return (
		<>
			{/*add onDelete, onEdit*/}
			<HutModal
				show={showHutModal}
				hut={props.hut}
				user={props.user}
				onClose={() => handleCloseHutModal()} />

			<Col className="mt-3">
				<Card>
					<Card.Body>
						<Card.Title>
							<Row className="d-flex justify-content-between">
								<Col>{props.hut.name}</Col>
								<Col className="d-flex justify-content-end">
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
							<FontAwesomeIcon icon={faMap}/>{' '}{props.hut.address}
							</Col>
							<Col xs={4}>
							<FontAwesomeIcon icon={faBed}/>{' '}{props.hut.bedspace}
							</Col>
						</Row>
					</Card.Body>
				</Card>
			</Col>
		</>
	);
}
