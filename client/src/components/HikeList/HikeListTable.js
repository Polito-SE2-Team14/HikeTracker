import { Table } from "react-bootstrap";
import React, { useState } from "react";
import HikeListRow from "./HikeListRow";
import { HikeModal } from "./HikeModal";

function HikeListTable(props) {
	const [showHikeModal, setShowHikeModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
	const [points, setPoints] = useState(null);
	const handleCloseHikeModal = () => {
		setShowHikeModal(false);
	};
	const handleShowHikeModal = () => {
		setShowHikeModal(true);
	};
    const handleShowEditModal = (hike) => {
        // TODO: make it work! hikeEditForm
        setShowEditModal(true);
    }
    const handleCloseEditModal = (hike) => {
        // TODO: make it work! hikeEditForm
        setShowEditModal(false);
    }

	return (
		<>
			<HikeModal
				show={showHikeModal}
				onHide={handleCloseHikeModal}
				onClose={handleCloseHikeModal}
				points={points}
			/>

			<Table className="table-hover table-border">
				<thead>
					<tr>
                        <th>{/*TODO: display only when logged as local guide*/}</th>
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
							<HikeListRow
								key={hike.hikeID}
								hike={hike}
								mode={props.mode}
								handleShowModal={handleShowHikeModal}
                                handleEditModal={handleShowEditModal}
								setPoints={setPoints}
							/>
						))
					) : (
						<tr>
                            <td>{/*TODO: display only when logged as local guide*/}</td>
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
		</>
	);
}

export default HikeListTable;


