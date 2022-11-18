import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import { Loading } from "../components/Loading";
import { HutListTable } from "../components/HutList/HutListTable";

import PointAPI from "../api/PointAPI";

export function HutsPage(props) {
	const [loading, setLoading] = useState(true);

	const [huts, setHuts] = useState([]);

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

	const getAllHuts = async () => {
		try {
			let huts = await PointAPI.getAllHuts();

			/* const huts = [
				{
					name: "hut1",
					latitude: 45.177786,
					longitude: 7.083372,
					address: "via da me",
					pointType: "hut",
					bedspace: 32,
				},
				{
					name: "hut2",
					latitude: 41.13,
					longitude: 13.32,
					address: "parco bio",
					pointType: "hut",
					bedspace: 10,
				},
			]; // TEST */
			setHuts(huts);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllHuts();
	}, [huts.length]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container>
					<Row className="mt-3">
						<Col>filter button</Col>
						<Col className="text-end"><Button onClick={() => handleSubmit()}>
			ADD
		</Button>
		<HutCreationModal show={modalVisible} onHide={handleClose} handleCreate={handleCreate} /></Col>
					</Row>
					{/*filter modal?*/}

					{/*form for hut insertion*/}

					<HutListTable huts={huts} setHuts={setHuts} user={props.user} />
				</Container>
			)}
		</>
	);
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

