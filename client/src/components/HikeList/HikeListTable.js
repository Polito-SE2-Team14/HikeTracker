import { Button, Modal, Table } from "react-bootstrap";
import React, { useState } from "react";
import HikeListRow from "./HikeListRow";

function HikeListTable(props) {

    const [showModal, setShowModal] = useState(false);
    const [points, setPoints] = useState(null);
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleShowModal = () => {
        setShowModal(true);
    };

    return <>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Points</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table className='table-hover'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Address</th>
                            <th>PointType</th>
                        </tr>
                    </thead>
                    <tbody>
                        {points ? points.map((point) => (

                            <tr>
                                <td>{point.pointID}</td>
                                <td>{point.name}</td>
                                <td>{point.latitude}</td>
                                <td>{point.longitude}</td>
                                <td>{point.address}</td>
                                <td>{point.pointType}</td>
                            </tr>

                        ))
                            :
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

        <Table className='table-hover table-border'>
            <thead>
                <tr>
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
                {props.hikes ? props.hikes.map((hike) => (
                    <HikeListRow
                        key={hike.hikeID}
                        hike={hike}
                        mode={props.mode}
                        handleShowModal={handleShowModal}
                        setPoints={setPoints}
                    />))
                    :
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                }
            </tbody>
        </Table>
    </>
}


export default HikeListTable;