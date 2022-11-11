import React from "react";
import { Button } from "react-bootstrap";

function HikeListRow(props) {

    const handleClick = async () => {
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