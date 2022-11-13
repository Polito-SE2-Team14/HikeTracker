import { Table } from "react-bootstrap";
import React, { useState } from "react";
import HikeListRow from "./HikeListRow";
import { HikeModal } from "./HikeModal";
import { HikeEditForm } from "./HikeEditForm";

function HikeListTable(props) {
	const [showHikeModal, setShowHikeModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

	const [selectedHike, setSelectedHike] = useState();
	const [points, setPoints] = useState(null);

	const handleCloseHikeModal = () => {
		setShowHikeModal(false);
	};

	const handleShowHikeModal = () => {
		setShowHikeModal(true);
	};

    const handleShowEditModal = (hike) => {
		setSelectedHike(hike);
        setShowEditModal(true);
    }

    const handleCloseEditModal = () => {
		setSelectedHike({});
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

			<HikeEditForm
				show={showEditModal}
				onHide={handleCloseEditModal}
				hike={selectedHike}
			/>
			{/*TODO: function={create/modify}*/}

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
								handleShowModal={() => handleShowHikeModal(hike)}
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


