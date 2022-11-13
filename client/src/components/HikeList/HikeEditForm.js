import { useState } from "react";
import { Button, Modal, Form, InputGroup, Col } from "react-bootstrap";
import { CalculatorFill } from "react-bootstrap-icons";

export function HikeEditForm(props) {
	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Points</Modal.Title>
			</Modal.Header>
			<Modal.Body>{"a"}</Modal.Body>
			<Modal.Footer>
				{/*TODO: function={create = primary/modify = success}, move footer to form*/}
				<Button variant="primary" onClick={props.onHide}>
					Update
				</Button>
				<Button variant="secondary" onClick={props.onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

// TODO: remove export

// h.title, h.length, h.expectedTime, h.ascent, h.difficulty, h.description,
export function HikeForm(props) {
	let [title, setTitle] = useState(props.hike ? props.hike.title : "");
	let [length, setLength] = useState(props.hike ? props.hike.length : 0);
	let [ascent, setAscent] = useState(props.hike ? props.hike.ascent : 0);
	let [expectedTime, setExpectedTime] = useState(
		props.hike ? props.hike.expectedTime : 0
	);
	let [difficulty, setDifficulty] = useState(
		props.hike ? props.hike.difficulty : ""
	);
	let [description, setDescription] = useState(
		props.hike ? props.hike.description : ""
	);

	return (
		<Form>
			<Form.Group controlId="formTitle">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					placeholder={props.hike ? props.hike.title : "Enter hike title"}
					value={title}
					onChange={(ev) => setTitle(ev.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId="formLength">
				<Form.Label>Length (meters)</Form.Label>
				<Form.Control
					type="number"
					placeholder={props.hike ? props.hike.length : "Enter hike length"}
					value={length}
					onChange={(ev) => setLength(ev.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId="formAscent">
				<Form.Label>Ascent (meters)</Form.Label>
				<Form.Control
					type="number"
					placeholder={props.hike ? props.hike.ascent : "Enter hike ascent"}
					value={ascent}
					onChange={(ev) => setAscent(ev.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId="formExpectedTime">
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
					{/*TODO: show only if length and ascent are set, calculator icon*/}
					<Button variant="outline-secondary" id="calculate">
						<CalculatorFill/>
					</Button>
				</InputGroup>
			</Form.Group>

			<Form.Group controlId="formDifficulty">
				<Form.Label>Difficulty</Form.Label>
				{["Tourist", "Hiker", "Professional Hiker"].map((d) => (
					<Form.Check
						key={d}
						value={d}
						type="radio"
						name="difficultyRadio"
						id={`difficulty-${d}`}
						label={d}
						defaultChecked={d === props.hike.difficulty}
						onChange={(ev) => setDifficulty(ev.target.value)}
					/>
				))}
			</Form.Group>

			<Form.Group controlId="formDescription">
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

			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
}
