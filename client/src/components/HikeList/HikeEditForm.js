import { useEffect, useState } from "react";
import {
	Button,
	Modal,
	Form,
	InputGroup,
	Row,
	Col,
	FormGroup,
} from "react-bootstrap";
import HikeAPI from "../../api/HikeAPI";
import PointAPI from "../../api/PointAPI";
import { isInArea } from "../HikeData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

// TODO(antonio): edit points, how??
// TODO(antonio): proper documentation
export function HikeEditForm(props) {
	let [editPoints, setEditPoints] = useState(false);
	let [hike, setHike] = useState(props.hike);

	let onHide = () => {
		props.onHide();

		setEditPoints(false);
	};

	let onSubmit = (h) => {
		props.setHikes((old) =>
			hike
				? //edited hike
				  old.map((el) => (el.hikeID == h.hikeID ? h : el))
				: //new hike
				  [...old, h]
		);

		setHike(h);

		setEditPoints((e) => !e);
	};

	return (
		<Modal show={props.show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Hike Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{!editPoints ? (
					<HikeForm hike={hike} onSubmit={onSubmit} onHide={onHide} />
				) : (
					<EditPointsForm hike={hike} onSubmit={onSubmit} onHide={onHide} />
				)}
			</Modal.Body>
		</Modal>
	);
}

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

	let [selectedFile, setSelectedFile] = useState("");
	let [fileContent, setFileContent] = useState("");
	let [useFile, setUseFile] = useState(false);
	let [province, setProvince] = useState(props.hike ? props.hike.province : "");
	let [municipality, setMunicipality] = useState(
		props.hike ? props.hike.municipality : ""
	);

	let fileChangeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		const reader = new FileReader();
		reader.readAsText(event.target.files[0]);
		reader.onload = () => {
			setFileContent(reader.result);
		};
		reader.onerror = () => {
			console.log("file error", reader.error);
		};
	};

	let handleSubmit = async (event) => {
		event.preventDefault();

		// TODO(antonio): validation and error on new hike/edit hike
		let hike = {
			hikeID: props.hike ? props.hike.hikeID : null,
			title: title,
			length: Math.round(length),
			expectedTime: expectedTime,
			ascent: ascent,
			difficulty: difficulty,
			description: description,
			municipality: municipality,
			province: province,
			gpxFile: fileContent,
		};

		if (hike.hikeID) {
			// NOTE: editing form
			HikeAPI.editHike(
				props.hike.hikeID,
				title,
				Math.round(length),
				expectedTime,
				ascent,
				difficulty,
				description,
				municipality,
				province
			).catch((e) => {
				// TODO(antonio): error handling
				console.log(e);
			});
		} else {
			// NOTE: adding form
			hike.hikeID = await HikeAPI.newHike(
				title,
				fileContent,
				difficulty,
				description,
				municipality,
				province
			).catch((e) => {
				// TODO(antonio): error handling
				console.log(e);
			});
		}

		props.onSubmit(hike);
	};

	return (
		<Form>
			<Form.Group controlId="formCheck" className="mb-3">
				<Form.Label>File Uploading For GPX</Form.Label>
				<Form.Check
					type="switch"
					id="file_switch"
					size="xl"
					checked={useFile}
					onChange={(ev) => {
						setUseFile(ev.target.checked);
					}}
				></Form.Check>
			</Form.Group>

			<Form.Group controlId="formTitle" className="mb-3">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					placeholder={props.hike ? props.hike.title : "Enter hike title"}
					value={title}
					onChange={(ev) => setTitle(ev.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId="formMunicipality" className="mb-3">
				<Form.Label>Municipality</Form.Label>
				<Form.Control
					type="text"
					placeholder={
						props.hike ? props.hike.municipality : "Enter hike municipality"
					}
					value={municipality}
					onChange={(ev) => setMunicipality(ev.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId="formProvince" className="mb-3">
				<Form.Label>Province</Form.Label>
				<Form.Control
					type="text"
					placeholder={props.hike ? props.hike.province : "Enter hike province"}
					value={province}
					onChange={(ev) => setProvince(ev.target.value)}
				/>
			</Form.Group>

			{!useFile && (
				<div>
					<Row>
						<Col>
							<Form.Group controlId="formLength" className="mb-3">
								<Form.Label>Length (meters)</Form.Label>
								<Form.Control
									type="number"
									// disabled={useFile}
									placeholder={
										props.hike ? props.hike.length : "Enter hike length"
									}
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
									// disabled={useFile}
									placeholder={
										props.hike ? props.hike.ascent : "Enter hike ascent"
									}
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
								// disabled={useFile}
								placeholder={
									props.hike ? props.hike.expectedTime : "Enter expected time"
								}
								value={expectedTime}
								onChange={(ev) => setExpectedTime(ev.target.value)}
								aria-describedby="calculate"
							/>
							<Button
								variant="outline-secondary"
								id="calculate"
								disabled={useFile}
							>
								<FontAwesomeIcon icon={faCalculator} />
							</Button>
						</InputGroup>
					</Form.Group>
				</div>
			)}

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

			<Form.Group controlId="formFile" className="mb-3">
				<Form.Label>GPX File</Form.Label>
				<Form.Control type="file" name="file" onChange={fileChangeHandler} />
			</Form.Group>

			<Row>
				<Col>
					<div className="text-end">
						<Button variant="primary" type="submit" onClick={handleSubmit}>
							Apply and edit points
						</Button>{" "}
						<Button variant="secondary" onClick={props.onHide}>
							Cancel
						</Button>
					</div>
				</Col>
			</Row>
		</Form>
	);
}

function EditPointsForm(props) {
	let [startPoints, setStartPoints] = useState([]);
	let [start, setStart] = useState("start");
	let [endPoints, setEndPoints] = useState([]);
	let [end, setEnd] = useState("end");

	let getPoints = async () => {
		try {
			let points = await PointAPI.getAllPoints();

			setStartPoints(
				points /*.filter(p =>
				isInArea(p, {
					center: props.hike.track[0],
					radius: 200
				}))
			*/
			);
			setEndPoints(
				points /*.filter(p =>
				isInArea(p, {
					center: props.hike.track[props.hike.track.length - 1],
					radius: 200
				}))
			*/
			);
		} catch (e) {
			console.log(e);
		}
	};

	let handleSubmit = (event) => {
		event.preventDefault();
		HikeAPI.addStartPoint(props.hike.hikeID, start.pointID);
		HikeAPI.addEndPoint(props.hike.hikeID, end.pointID);

		props.onHide();
		props.onSubmit(props.hike);
	};

	useEffect(() => {
		getPoints();
	}, []);

	return (
		<Form>
			<Row>map</Row>
			<Row>
				<Form.Group controlId="formStartPoint" className="mb-3">
					<Form.Select
						aria-label="Start Point"
						onChange={(ev) => setStart(startPoints[ev.target.value])}
					>
						{startPoints.map((p, i) => (
							<option key={i} value={i}>
								{p.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
			</Row>
			<Row>
				<Form.Group controlId="formEndPoint" className="mb-3">
					<Form.Select
						aria-label="Start Point"
						onChange={(ev) => setEnd(endPoints[ev.target.value])}
					>
						{endPoints.map((p, i) => (
							<option key={i} value={i}>
								{p.name}
							</option>
						))}
					</Form.Select>
				</Form.Group>
			</Row>
			{/* reference points */}
			<Row>
				<div className="text-end">
					<Button variant="primary" type="submit" onClick={handleSubmit}>
						Apply
					</Button>{" "}
					<Button variant="secondary" onClick={props.onHide}>
						Cancel
					</Button>
				</div>
			</Row>
		</Form>
	);
}
