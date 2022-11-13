import React from "react";
import { Button } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import HikeAPI from "../../api/HikeAPI";

function HikeListRow(props) {
	const getAllPoints = async () => {
		try {
			const points = await HikeAPI.getHikePoints(props.hike.hikeID);
			props.setPoints(points);
		} catch (error) {
			console.log(error);
		}
	};

	const handleShowClick = async () => {
		getAllPoints();
		props.handleShowModal();
	};

	const handleShowDescClick = async () => {
		props.setHikeDescription(props.hike.description);
		props.handleShowHikeDescriptionModal();
	};

	const handleEditClick = async () => {
		props.handleEditModal(props.hike);
	};

	return (
		<tr>
			{props.user.type === "Local guide" ? (
				<td>
					<Button variant="warning" onClick={handleEditClick}>
						<PencilSquare />
					</Button>
				</td>
			) : (
				false
			)}
			<td>{props.hike.title}</td>
			<td>{props.hike.length}</td>
			<td>{props.hike.expectedTime}</td>
			<td>{props.hike.ascent}</td>
			<td>{props.hike.difficulty}</td>
			<td>
				<Button variant="secondary" onClick={handleShowDescClick}>
					Show
				</Button>
			</td>
			<td>
				<Button variant="primary" onClick={handleShowClick}>
					Show
				</Button>
			</td>
		</tr>
	);
}

export default HikeListRow;
