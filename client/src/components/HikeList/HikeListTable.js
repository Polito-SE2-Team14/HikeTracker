import { Table, Button, Row } from "react-bootstrap";
import React, { useState } from "react";
import HikeListRow from "./HikeListRow";
import { HikeModal } from "./HikeModal";
import { HikeEditForm } from "./HikeEditForm";
import { HikeDescriptionModal } from "./HikeDescriptionModal";

function HikeListTable(props) {
	const [showHikeModal, setShowHikeModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showHikeDescriptionModal, setShowHikeDescriptionModal] =
		useState(false);

	const [selectedHike, setSelectedHike] = useState();
	const [selectedFunction, setSelectedFunction] = useState();
	const [points, setPoints] = useState(null);
	const [hikeDescription, setHikeDescription] = useState(null);

	const handleCloseHikeModal = () => {
		setShowHikeModal(false);
	};

	const handleShowHikeModal = () => {
		setShowHikeModal(true);
	};
	const handleShowHikeDescriptionModal = () => {
		setShowHikeDescriptionModal(true);
	};

	const handleCloseHikeDescriptionModal = () => {
		setShowHikeDescriptionModal(false);
	};

	const handleShowEditModal = (hike) => {
		setSelectedHike(hike);
		setSelectedFunction("Modify");
		setShowEditModal(true);
	};

	const handleCloseEditModal = () => {
		setSelectedHike({});
		setSelectedFunction("");
		setShowEditModal(false);
	};

	const handleNewHikeModal = () => {
		setSelectedHike({});
		setSelectedFunction("Create");
		setShowEditModal(true);
	};

	return (
		<>
			<HikeModal
				show={showHikeModal}
				onHide={handleCloseHikeModal}
				onClose={handleCloseHikeModal}
				points={points}
			/>

			<HikeDescriptionModal
				show={showHikeDescriptionModal}
				onHide={handleCloseHikeDescriptionModal}
				onClose={handleCloseHikeDescriptionModal}
				hikeDescription={hikeDescription}
			/>

			<HikeEditForm
				show={showEditModal}
				hike={selectedHike}
				function={selectedFunction}
				onHide={handleCloseEditModal}
			/>

			<Table className="table-hover table-border">
				<thead>
					<tr>
						{props.user.type === "Local guide" ? <th></th> : false}
						<th>ID</th>
						<th>Title</th>
						<th>Length</th>
						<th>Expected Time</th>
						<th>Ascent</th>
						<th>Difficulty</th>
						<th>Description</th>
						<th>Points</th>
						{props.mode && props.mode === "edit" && <th>Actions</th>}
					</tr>
				</thead>
				<tbody>
					{props.hikes ? (
						props.hikes.map((hike) => (
							<>
								<HikeListRow
									key={hike.hikeID}
									hike={hike}
									user={props.user}
									mode={props.mode}
									handleShowModal={handleShowHikeModal}
									handleEditModal={handleShowEditModal}
									handleShowHikeDescriptionModal={
										handleShowHikeDescriptionModal
									}
									setPoints={setPoints}
									setHikeDescription={setHikeDescription}
								/>
							</>
						))
					) : (
						<tr>
							{props.user.type === "Local guide" ? <td></td> : false}
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					)}
				</tbody>
			</Table>
			<span>
			{props.user.type === "Local guide" ? (
									<Button variant="success" onClick={handleNewHikeModal}>
										+
									</Button>
								) : (
									false
								)}{' '}
				Insert new hike
			</span>
		</>
	);
}

export default HikeListTable;
