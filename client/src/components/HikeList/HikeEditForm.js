import { useState } from "react";
import { Button, Modal, Form, InputGroup, Row, Col } from "react-bootstrap";
import { CalculatorFill, TrashFill } from "react-bootstrap-icons";
import HikeAPI from "../../api/HikeAPI";

// TODO(antonio): edit points, how??
// TODO(antonio): proper documentation
export function HikeEditForm(props) {
	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Hike Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<HikeForm
					hike={props.hike}
					setHikes={props.setHikes}
					onHide={props.onHide}
				/>
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	);
};

//TODO(antonio): proper documentation
function HikeForm(props) {
	let [title, setTitle] = useState(props.hike ? props.hike.title : "");
	let [length, setLength] = useState(props.hike ? props.hike.length : 0);
	let [ascent, setAscent] = useState(props.hike ? props.hike.ascent : 0);
	let [expectedTime, setExpectedTime] = useState(
		props.hike ? props.hike.expectedTime : 0
	);
	let [difficulty, setDifficulty] = useState(
		props.hike ? props.hike.difficulty : "Tourist"
	);
	let [description, setDescription] = useState(
		props.hike ? props.hike.description : ""
	);

	let handleDelete = () => {
		// TODO(antonio): confirm prompt
	}

	let handleSubmit = (event) => {
		event.preventDefault();

		// TODO(antonio): validation and error on new hike/edit hike
		let hike = {
			title: title,
			length: length,
			expectedTime: expectedTime,
			ascent: ascent,
			difficulty: difficulty,
			description: description,
		};

		if (props.hike) {
			// NOTE: editing form
			HikeAPI.editHike(
				props.hike.hikeID,
				title,
				length,
				expectedTime,
				ascent,
				difficulty,
				description
			)
				.then(() => {
					props.setHikes((old) =>
						{return old.map((h) => (h.hikeID === props.hike.hikeID ? hike : h))}
					); //TODO(antonio): temp value, mark differently
				})
				.catch((e) => {
					// TODO(antonio): error handling
					console.log(e);
				});
		} else {
			// NOTE: adding form
			HikeAPI.newHike(
				title,
				length,
				expectedTime,
				ascent,
				difficulty,
				description
			)
				.then(() => {
					props.setHikes((old) => [...old, hike]); //TODO(antonio): temp value, mark differently
				})
				.catch((e) => {
					// TODO(antonio): error handling
					console.log(e);
				});
		}

		props.onHide();
	};

	return (
		<Form>
			<Form.Group controlId="formTitle" className="mb-3">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					placeholder={props.hike ? props.hike.title : "Enter hike title"}
					value={title}
					onChange={(ev) => setTitle(ev.target.value)}
				/>
			</Form.Group>

			<Row>
				<Col>
					<Form.Group controlId="formLength" className="mb-3">
						<Form.Label>Length (meters)</Form.Label>
						<Form.Control
							type="number"
							placeholder={props.hike ? props.hike.length : "Enter hike length"}
							value={length}
							onChange={(ev) => setLength(ev.target.value)}
						/>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group controlId="formAscent" className="mb-3">
						<Form.Label>Ascent (meters)</Form.Label>
						<Form.Control
							type="number"
							placeholder={props.hike ? props.hike.ascent : "Enter hike ascent"}
							value={ascent}
							onChange={(ev) => setAscent(ev.target.value)}
						/>
					</Form.Group>
				</Col>
			</Row>

			<Form.Group controlId="formExpectedTime" className="mb-3">
				<Form.Label>Expected time (minutes)</Form.Label>
				<InputGroup>
					<Form.Control
						type="number"
						placeholder={
							props.hike ? props.hike.expectedTime : "Enter expected time"
						}
						value={expectedTime}
						onChange={(ev) => setExpectedTime(ev.target.value)}
						aria-describedby="calculate"
					/>
					<Button variant="outline-secondary" id="calculate">
						<CalculatorFill />
					</Button>
				</InputGroup>
			</Form.Group>

			<Form.Group controlId="formDifficulty" className="mb-3">
				<Form.Label>Difficulty</Form.Label>
				{["Tourist", "Hiker", "Professional Hiker"].map((d) => (
					<Form.Check
						key={d}
						value={d}
						type="radio"
						name="difficultyRadio"
						id={`difficulty-${d}`}
						label={d}
						defaultChecked={
							props.hike ? d === props.hike.difficulty : d === "Tourist"
						}
						onChange={(ev) => setDifficulty(ev.target.value)}
					/>
				))}
			</Form.Group>

			<Form.Group controlId="formDescription" className="mb-3">
				<Form.Label>Description</Form.Label>
				<Form.Control
					as="textarea"
					placeholder={
						props.hike ? props.hike.description : "Enter hike description"
					}
					value={description}
					onChange={(ev) => setDescription(ev.target.value)}
				/>
			</Form.Group>

			<Row>
				<Col>
				<div className="text-end">
				<Button variant="primary" type="submit" onClick={handleSubmit}>
					Submit
				</Button>{" "}
				<Button variant="secondary" onClick={props.onHide}>
					Cancel
				</Button>
			</div>
				</Col>
			</Row>
		</Form>
	);
};
