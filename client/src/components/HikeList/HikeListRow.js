import React from "react";
import { Button } from "react-bootstrap";
import PointAPI from "../../api/PointAPI";

function HikeListRow(props) {

    const getAllPoints = async () => {
		try {
			const points = await PointAPI.getHikePoints(props.hike.hikeID);
			props.setPoints(points);
		} catch (error) {
			console.log(error);
		}
	};

    const handleClick = async () => {
        // getAllPoints();
        props.handleShowModal();
    }

    return <>
        <tr>
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
                <Button variant="primary" onClick={handleClick}>
                    Show
                </Button>
            </td>
        </tr>
    </>
}




export default HikeListRow;