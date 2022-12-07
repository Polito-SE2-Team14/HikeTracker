import { useEffect, useState } from "react";
import { Button, Modal, Form, InputGroup, Row, Col } from "react-bootstrap";
import HikeAPI from "../../api/HikeAPI";
import PointAPI from "../../api/PointAPI";
import { HikeMap } from "../Map/Maps";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";

import { CountryDropdown, MunicipalityDropdown, ProvinceDropdown } from "../Dropdowns"


//New Select
import Select from 'react-select'

// TODO(antonio): edit points, how??
// TODO(antonio): proper documentation
export function HikeEditForm(props) {
	let [editPoints, setEditPoints] = useState(false);
	let [hike, setHike] = useState(props.hike);

	let onHide = () => {
		props.onHide();

		setEditPoints(false);
		setHike(null);
	};

	let onSubmit = async (hikeID) => {
		let newHike = await HikeAPI.getHike(hikeID);
		newHike.show = true;

		props.setHikes(old =>
			hike
				? //edited hike
				old.map(h => (h.hikeID === newHike.hikeID ? newHike : h))
				: //new hike
				[...old, newHike]
		);

		setHike(newHike);

		setEditPoints(true);
	};

	return (
		<Modal show={props.show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Hike Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{!editPoints ? (
					<HikeForm hike={hike} onSubmit={onSubmit} onHide={onHide} newHike={props.newHike} />
				) : (
					<EditPointsForm hike={hike} onSubmit={onSubmit} onHide={onHide} user={props.user} />
				)}
			</Modal.Body>
		</Modal>
	);
}

//TODO(antonio): proper documentation
function HikeForm(props) {
	// rimettere a ""
	let [title, setTitle] = useState(props.hike ? props.hike.title : "sadion");
	let [length, setLength] = useState(props.hike ? props.hike.length : 0);
	let [ascent, setAscent] = useState(props.hike ? props.hike.ascent : 0);
	let [expectedTime, setExpectedTime] = useState(
		props.hike ? props.hike.expectedTime : 0
	);
	let [difficulty, setDifficulty] = useState(
		props.hike ? props.hike.difficulty : "Tourist"
	);
	// rimettere a ""
	let [description, setDescription] = useState(
		props.hike ? props.hike.description : "fsgdhf"
	);

	let [selectedFile, setSelectedFile] = useState("");
	let [fileContent, setFileContent] = useState("");
	let [useFile, setUseFile] = useState(false);
	// rimettere a ""
	let [province, setProvince] = useState(props.hike ? props.hike.province : "Badakhshan");
	// rimettere a ""
	let [municipality, setMunicipality] = useState(props.hike ? props.hike.municipality : "Fayzabad");
	// rimettere a ""
	let [country, setCountry] = useState(props.country ? props.hike.country : "Afghanistan");


	let fileChangeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		const reader = new FileReader();
		reader.readAsText(event.target.files[0]);
		reader.onload = () => {
			setFileContent(reader.result);
		};
		reader.onerror = () => {
			console.error("file error", reader.error);
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
				{
					hikeID: props.hike.hikeID, title: title, length: Math.round(length),
					expectedTime: expectedTime, ascent: ascent, difficulty: difficulty,
					description: description, municipality: municipality, province: province
				}
			).catch((e) => {
				// TODO(antonio): error handling
				console.error(e);
			});
		} else {
		
			await props.newHike(
				{
					title: title, track: fileContent, difficulty: difficulty,
					description: description, municipality: municipality, province: province,
					country: country
				})
				.then(h => hike = h)
				.catch((e) => {
					// TODO(antonio): error handling
					console.error(e);
				})

		}

		props.onSubmit(hike.hikeID);
	};

	return (
		<Form onSubmit={handleSubmit}>
			{props.hike &&
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
			}

			<Form.Group controlId="formTitle" className="mb-3">
				<Form.Label>Title</Form.Label>
				<Form.Control
					type="text"
					placeholder={props.hike ? props.hike.title : "Enter hike title"}
					value={title}
					required={true}

					onChange={(ev) => setTitle(ev.target.value)}
				/>
			</Form.Group>

			<Form.Group controlId="formCountry" className="mb-3">
				<Form.Label>Country</Form.Label>
					<CountryDropdown
						country={country}
						setCountry={setCountry}
					/>
				{/* <Form.Label>Country</Form.Label>
				<Form.Control
					type="text"
					required={true}

					placeholder={props.country ? props.hike.country : "Enter hike country"}
					value={country}
					onChange={(ev) => setCountry(ev.target.value)}
				/> */}
			</Form.Group>

			<Form.Group controlId="formProvince" className="mb-3">
				<Form.Label>Province</Form.Label>
				<ProvinceDropdown
					disabled={country==""}
					province={province}
					setProvince={setProvince}
					country={country}
				/>
				{/* <Form.Control
					type="text"
					required={true}

					placeholder={props.hike ? props.hike.province : "Enter hike province"}
					value={province}
					onChange={(ev) => setProvince(ev.target.value)}
				/> */}
			</Form.Group>

			<Form.Group controlId="formMunicipality" className="mb-3">
				<Form.Label>Municipality</Form.Label>
				<MunicipalityDropdown
					disabled={province==""}
					municipality={municipality}
					setMunicipality={setMunicipality}
					country={country}
					province={province}
				/>
				{/* <Form.Control
					type="text"
					required={true}

					placeholder={
						props.hike ? props.hike.municipality : "Enter hike municipality"
					}
					value={municipality}
					onChange={(ev) => setMunicipality(ev.target.value)}
				/> */}
			</Form.Group>

			{props.hike && !useFile && (
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
						<Button variant="primary" type="submit" >
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
	let [start, setStart] = useState([]);
	let [endPoints, setEndPoints] = useState([]);
	let [end, setEnd] = useState([]);
	let [track, setTrack] = useState([]);

	let getPoints = async () => {
		try {
			let newTrack = await HikeAPI.getHikeTrack(props.hike.hikeID);
			let points = await PointAPI.getAllPoints();
			points = points ? points.filter(p => p.pointType != 'generic') : [];

			setTrack(newTrack);

			setStartPoints(
				points /*.filter(p =>
				isInArea(p, {
					center: props.hike.track[0],
					radius: 500
				}))
			*/
			);
			setEndPoints(
				points /*.filter(p =>
				isInArea(p, {
					center: props.hike.track[props.hike.track.length - 1],
					radius: 500
				}))
			*/
			);

			setStart(newTrack[0]);
			setEnd(newTrack[newTrack.length - 1]);
		} catch (e) {
			console.error(e);
		}
	};

	let handleSubmit = async (event) => {
		event.preventDefault();

		try {
			await HikeAPI.addStartPoint(props.hike.hikeID, start.pointID);
			await HikeAPI.addEndPoint(props.hike.hikeID, end.pointID);

			props.onSubmit(props.hike.hikeID);
			props.onHide();
		}
		catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		getPoints();
	}, []);

	const startPointOptions = startPoints.map((p, i) => {
		return {
			'value': i,
			'label': p.name
		};
	});

	const endPointOptions = endPoints.map((p, i) => {
		return {
			'value': i,
			'label': p.name
		};
	});

	return (
		<Form>
			<Row>
				<HikeMap
					user={props.user}
					track={track}
					markers={[start, end]}
				/>
			</Row>
			<Row>
				<Form.Group controlId="formStartPoint" className="mb-3">
					<Form.Label>Start Point</Form.Label>
					{/* <Form.Select
						onChange={(ev) => setStart(startPoints[ev.target.value])}
					>
						<option value={0}>Start Point</option>
						{startPoints.map((p, i) => (
							<option key={i} value={i}>
								{p.name}
							</option>
						))}
					</Form.Select> */}

					<Select options={startPointOptions} onChange={(ev) => setStart(startPoints[ev.value])} />
				</Form.Group>
			</Row>
			<Row>
				<Form.Group controlId="formEndPoint" className="mb-3">
					<Form.Label>End Point</Form.Label>
					{/* <Form.Select
						onChange={(ev) => setEnd(endPoints[ev.target.value])}
					>
						<option value={0}>End Point</option>
						{endPoints.map((p, i) => (
							<option key={i} value={i}>
								{p.name}
							</option>
						))}
					</Form.Select> */}

					<Select options={endPointOptions} onChange={(ev) => setEnd(endPoints[ev.value])} />
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
