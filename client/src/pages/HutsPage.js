import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";




export function HutsPage() {
	const [modalVisible, setModalVisible] = useState(false)

	const handleSubmit = () => {
		setModalVisible(true)
	}

	const handleClose = () => {
		setModalVisible(false)

	}

	const handleCreate = () => {
		setModalVisible(false)

	}

	return <>
		<Button onClick={() => handleSubmit()}>
			ADD
		</Button>
		<HutCreationModal show={modalVisible} onHide={handleClose} handleCreate={handleCreate} />
	</>;
}

function HutCreationModal(props) {
	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Hut Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<HutCreationForm handleCreate={props.handleCreate}

				/>
			</Modal.Body>
		</Modal>
	);
}

function HutCreationForm(props) {
	return <Form>
		<Form.Group controlId="formTitle" className="mb-3">
			<Form.Label>Name</Form.Label>
			<Form.Control type="text" />
		</Form.Group>

		<Row>
			<Col>
				<Form.Group className="mb-3">
					<Form.Label>Latitude</Form.Label>
					<Form.Control
						type="number"

					/>
				</Form.Group>
			</Col>
			<Col>
				<Form.Group className="mb-3">
					<Form.Label>Longitude</Form.Label>
					<Form.Control
						type="number"
					/>
				</Form.Group>
			</Col>
		</Row>

		<Form.Group className="mb-3">
			<Form.Label>Address</Form.Label>
			<Form.Control
				type="text"
			/>
		</Form.Group>
		<Row>
			<Col>
				<Form.Group className="mb-3">
					<Form.Label>Bedspace</Form.Label>
					<Form.Control
						type="number"

					/>
				</Form.Group>
			</Col>
			<Col>
				<Form.Group className="mb-3">
					<Form.Label>HutOwnerID</Form.Label>
					<Form.Control
						type="number"
					/>
				</Form.Group>
			</Col>
		</Row>
		<InputGroup>
			<Button onClick={() => props.handleCreate()}>

			</Button>
		</InputGroup>
	</Form >
}