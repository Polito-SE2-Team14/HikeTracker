import { Button, Modal, Table, Tab, Tabs } from "react-bootstrap";
import React from "react";
import { HikeMap } from "../Maps";

export function HikeModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Points</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs defaultActiveKey="map" id="hike-popup-tabs">
                    <Tab eventKey="list" title="List">
                        <PointsTable points={props.points} />
                    </Tab>
                    <Tab eventKey="map" title="Map">
                        <HikeMap points={props.points} />
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
function PointsTable(props) {
    return <Table className='table-hover'>
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
            {props.points ? props.points.map((point) => (

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
                </tr>}
        </tbody>
    </Table>;
}
