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
    }

    const handleEditClick = async () => {
        //getAllPoints();
        props.handleEditModal(props.hike);
    }

    return <tr>
            <td>
                {/*TODO: display only when logged as local guide*/}
                <Button variant="warning" onClick={handleEditClick}>
                    <PencilSquare/>
                </Button>
            </td>
            <td>
                {props.hike.hikeID}
            </td>
            <td>
                {props.hike.title}
            </td>
            <td>
                {props.hike.length}
            </td>
            <td>
                {props.hike.expectedTime}
            </td>
            <td>
                {props.hike.ascent}
            </td>
            <td>
                {props.hike.difficulty}
            </td>
            <td>
                {props.hike.description}
            </td>
            <td>
                <Button variant="primary" onClick={handleShowClick}>
                    Show
                </Button>
            </td>
        </tr>
}




export default HikeListRow;