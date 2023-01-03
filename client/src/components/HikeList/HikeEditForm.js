import { useEffect, useState } from "react";
import { Button, Modal, Form, InputGroup, Row, Col, Alert } from "react-bootstrap";
import HikeAPI from "../../api/HikeAPI";
import PointAPI from "../../api/PointAPI";
import { HikeMap } from "../Maps/HikeMap";
import { isInArea } from "../HikeData";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";


import { CountrySelect, MunicipalitySelect, ProvinceSelect } from "../CoMunProvSelect"
// import { CountryDropdown, MunicipalityDropdown, ProvinceDropdown } from "../Dropdowns"


//New Select
import Select from 'react-select'
import { ImageForm } from "../ImageForm";

// TODO(antonio): edit points, how??
// TODO(antonio): proper documentation
export function HikeEditForm(props) {
	const [editPoints, setEditPoints] = useState(false);
	const [hike, setHike] = useState(props.hike);
	const [image, setImage] = useState(false);

	let onHide = () => {
		props.onHide();

		setEditPoints(false);
		setImage(false);
		setHike(null);
	};

	let onSubmit = async (data) => {
		let newHike = data;
		newHike.show = true;

		props.setHikes(old =>
			hike
				? //edited hike
				old.map(h => (h.hikeID === newHike.hikeID ? newHike : h))
				: //new hike
				[...old, newHike]
		);

		setHike(newHike);
	};

	return (
		<Modal show={props.show} onHide={onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Hike Info</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{!editPoints ? (
					<HikeForm
						hike={hike}
						goToPoints={function () { setEditPoints(true); }}
						onSubmit={onSubmit}
						onHide={onHide}
						newHike={props.newHike}
					/>
				) : (
					image ? (
						<EditPointsForm
							hike={hike}
							onSubmit={onSubmit}
							onHide={onHide}
							user={props.user}
						/>
					) : (
						<ImageForm
							id={hike.hikeID}
							setImage={setImage}
							API={HikeAPI}
						/>
					)
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

	let [fileContent, setFileContent] = useState("");
	let [useFile, setUseFile] = useState(false);
	let [province, setProvince] = useState(props.hike ? props.hike.province : "");
	let [municipality, setMunicipality] = useState(props.hike ? props.hike.municipality : "");
	let [country, setCountry] = useState(props.hike ? props.hike.country : "");


	let fileChangeHandler = (event) => {
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
			difficulty: difficulty,
			description: description,
			municipality: municipality,
			province: province,
			country: country
		};

		if (hike.hikeID) {
			// NOTE: editing form

			// HikeAPI.editHike(
			// 	{
			// 		hikeID: props.hike.hikeID, title: title, length: Math.round(length),
			// 		expectedTime: expectedTime, ascent: ascent, difficulty: difficulty,
			// 		description: description, municipality: municipality, province: province
			// 	}
			// ).catch((e) => {
			// 	// TODO(antonio): error handling
			// 	console.error(e);
			// });
		} else {

			await props.newHike(
				{
					title: title, track: fileContent, difficulty: difficulty,
					description: description, municipality: municipality, province: province,
					country: country
				})
				.then(h => hike = {
					...hike,
					...h
				})
				.catch((e) => {
					// TODO(antonio): error handling
					console.error(e);
				})

		}

		await props.onSubmit(hike);
		props.goToPoints();
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
						onChange={function (ev) { setUseFile(ev.target.checked); }}
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

					onChange={function (ev) { setTitle(ev.target.value); }}
				/>
			</Form.Group>

			<Form.Group controlId="formCountry" className="mb-3">
				<Form.Label>Country</Form.Label>
				{/* <CountryDropdown
					country={country}
					setCountry={setCountry}
				/> */}
				<CountrySelect
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
				{/* <ProvinceDropdown
					disabled={country === ""}
					province={province}
					setProvince={setProvince}
					country={country}
				/> */}
				<ProvinceSelect
					disabled={country === ""}
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
				{/* <MunicipalityDropdown
					disabled={province === ""}
					municipality={municipality}
					setMunicipality={setMunicipality}
					country={country}
					province={province}
				/> */}
				<MunicipalitySelect
					disabled={province === ""}
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
									onChange={function (ev) { setLength(ev.target.value); }}
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
									onChange={function (ev) { setAscent(ev.target.value); }}
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
								onChange={function (ev) { setExpectedTime(ev.target.value); }}
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
						onChange={function (ev) { setDifficulty(ev.target.value); }}
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
					onChange={function (ev) { setDescription(ev.target.value); }}
				/>
			</Form.Group>

			<Form.Group controlId="formFile" className="mb-3">
				<Form.Label>GPX File</Form.Label>
				<Form.Control type="file" accept=".gpx" name="file" onChange={fileChangeHandler} />
			</Form.Group>

			<Row>
				<Col>
					<div className="text-end">
						<Button variant="primary" type="submit" >
							Apply and Set Image
						</Button>{" "}
						{props.hike &&
							<div>
								<Button variant="secondary" onClick={props.goToPoints} >
									Edit points
								</Button>{" "}
							</div>
						}
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
	const [msg, setMsg] = useState(false);
	const [startPoints, setStartPoints] = useState([]);
	const [start, setStart] = useState(null);
	const [endPoints, setEndPoints] = useState([]);
	const [end, setEnd] = useState(null);
	const [track, setTrack] = useState([]);
	const [closeHuts, setCloseHuts] = useState([]);
	const [linkedHuts, setLinkedHuts] = useState([]);

	let getPoints = async () => {
		try {
			let newTrack = await HikeAPI.getHikeTrack(props.hike.hikeID);
			let newHuts = await HikeAPI.getCloseHuts(props.hike.hikeID);
			let linkedIDs = await HikeAPI.getLinkedHuts(props.hike.hikeID);
			let points = await PointAPI.getAllPoints();

			points = points ? points.filter(p => p.pointType !== 'generic') : [];

			setTrack(newTrack);

			let huts = newHuts.map((p, i) => {
				return {
					pointID: p.pointID,
					name: p.name,
					longitude: p.longitude,
					latitude: p.latitude,
					options: {
						'value': i,
						'label': p.name
					}
				}
			})

			setCloseHuts(huts.filter(p => !linkedIDs.includes(p.pointID)));

			setLinkedHuts(huts.filter(p => linkedIDs.includes(p.pointID)));

			setStartPoints(
				points.filter(p =>
					isInArea(
						{ longitude: p.lon, latitude: p.lat },
						{
							center: newTrack[0],
							radius: 5000
						}
					)).map((p, i) => {
						return {
							pointID: p.pointID,
							name: p.name,
							longitude: p.lon,
							latitude: p.lat,
							options: {
								'value': i,
								'label': p.name
							}
						}
					})
			);
			setEndPoints(
				points.filter(p =>
					isInArea(
						{ longitude: p.lon, latitude: p.lat },
						{
							center: newTrack[newTrack.length - 1],
							radius: 5000
						}
					)).map((p, i) => {
						return {
							pointID: p.pointID,
							name: p.name,
							longitude: p.lon,
							latitude: p.lat,
							options: {
								'value': i,
								'label': p.name
							}
						}
					})
			);

			setStart(() => {
				let startPoint = points.filter(p => p.pointID == props.hike.startPointID).pop();

				if (startPoint)
					return startPoint;
				else
					return;
			});
			setEnd(() => {
				let endPoint = points.filter(p => p.pointID == props.hike.endPointID).pop();

				if (endPoint)
					return endPoint;
				else
					return;
			});
		} catch (e) {
			console.error(e);
		}
	};

	let handleAdd = (value) => {
		setLinkedHuts(old => [...old, closeHuts[value]]
			.map((p, i) => {
				return {
					...p,
					options: {
						'value': i,
						'label': p.name
					}
				}
			}));

		setCloseHuts(old => old.filter((p, i) => i !== value)
			.map((p, i) => {
				return {
					...p,
					options: {
						'value': i,
						'label': p.name
					}
				}
			}));
	};

	let handleRemove = (value) => {
		setCloseHuts(old => [...old, linkedHuts[value]]
			.map((p, i) => {
				return {
					...p,
					options: {
						'value': i,
						'label': p.name
					}
				}
			}));
		setLinkedHuts(old => old.filter((p, i) => i !== value)
			.map((p, i) => {
				return {
					...p,
					options: {
						'value': i,
						'label': p.name
					}
				}
			}));
	}

	let handleSubmit = async event => {
		event.preventDefault();

		if (start && end)
			try {
				await HikeAPI.addStartPoint(props.hike.hikeID, start.pointID);
				await HikeAPI.addEndPoint(props.hike.hikeID, end.pointID);
				await HikeAPI.addHuts(props.hike.hikeID, linkedHuts.map(h => h.pointID));

				setMsg(false);
				props.onSubmit(props.hike);
				props.onHide();
			}
			catch (e) {
				console.error(e);
			}
		else setMsg('Start Point and End Point must be set');
	};

	useEffect(() => {
		getPoints();
	}, []);

	return (
		<Form>
			<Row>
				<HikeMap
					user={props.user}
					track={track}
					markers={{
						start: start,
						end: end,
						linkedHuts: linkedHuts
					}}
				/>
			</Row>
			{msg && <Alert variant='danger' onClose={function () { props.setMsg(false); }} dismissible>{msg}</Alert>}
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

					<Select options={startPoints.map((p) => p.options)} onChange={function (ev) { setStart(startPoints[ev.value]); }} />
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

					<Select options={endPoints.map(p => p.options)} onChange={function (ev) { setEnd(endPoints[ev.value]); }} />
				</Form.Group>
			</Row>
			<Form.Group controlId="formHuts" className="mb-3">
				<Form.Label>Huts</Form.Label>
				<Select options={closeHuts.map(p => p.options)} onChange={function (ev) { handleAdd(ev.value); }} />
				<div>
					{linkedHuts.map((p, i) =>
						<Row key={i}>
							<Col>
								{p.options.label}
							</Col>
							<Col className="text-end">
								<Button
									size="sm"
									variant="delete"
									onClick={function () { handleRemove(p.options.value); }}
								>
									X
								</Button>
							</Col>
						</Row>
					)}
				</div>
			</Form.Group>
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
