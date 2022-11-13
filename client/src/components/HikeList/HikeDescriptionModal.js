import { Button, Modal } from "react-bootstrap";
import React from "react";

export function HikeDescriptionModal(props) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Hike Description</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.hikeDescription}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
