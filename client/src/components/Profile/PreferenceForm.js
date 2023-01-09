import {
	faClock,
	faCompass,
	faHiking,
	faMap,
	faMountain
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
	Row,
	Col, Button,
	Modal,
	Form,
	InputGroup
} from "react-bootstrap";
import UserAPI from "../../api/UserAPI";
import { CountrySelect, ProvinceSelect } from "../CoMunProvSelect";

export function PreferenceForm(props) {

	console.log(props.stats)



	const [favouriteDifficulty, setFavoriteDifficulty] = useState(
		props.stats.favouriteDifficulty ? props.stats.favouriteDifficulty : ""
	);

	const [favouriteCountry, setFavoriteCountry] = useState(
		props.stats.favouriteCountry ? props.stats.favouriteCountry : ""
	);
	const [favouriteProvince, setFavoriteProvince] = useState(
		props.stats.favouriteProvince ? props.stats.favouriteProvince : ""
	);

	const [minDistance, setMinDistance] = useState(
		props.stats.minDistance ? props.stats.minDistance : 0
	);
	const [maxDistance, setMaxDistance] = useState(
		props.stats.maxDistance ? props.stats.maxDistance : 0
	);

	const [minAscent, setMinAscent] = useState(
		props.stats.minAscent ? props.stats.minAscent : 0
	);
	const [maxAscent, setMaxAscent] = useState(
		props.stats.maxAscent ? props.stats.maxAscent : 0
	);

	const [minTime, setMinTime] = useState(
		props.stats.minTime ? props.stats.minTime : 0
	);
	const [maxTime, setMaxTime] = useState(
		props.stats.maxTime ? props.stats.maxTime : 0
	);

	console.log("maxTime", maxTime)


	const handleSubmit = (ev) => {
		ev.preventDefault();

		let stats = {
			userID: props.user.userID,
			//completedHikes: completedHikes,
			favouriteDifficulty: favouriteDifficulty,
			favouriteCountry: favouriteCountry,
			favouriteProvince: favouriteProvince,
			minDistance: minDistance,
			maxDistance: maxDistance,
			minAscent: minAscent,
			maxAscent: minAscent,
			minTime: minTime,
			maxTime: maxTime,
		};

		console.log(props.stats);
		if (!props.stats) {
			UserAPI.addUserStats(stats);
		} else {
			UserAPI.setUserStats(stats);
		}
		props.setStats(stats);
		props.setShowStats(true);
	};

	return (
		<Modal show={props.showPreferenceForm} onHide={props.onHide}>
			<Modal.Header closeButton>Set Preferences</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Row>
							{/* <Col>
								<Form.Label>Completed Hikes</Form.Label>
								<Form.Control
									type="number"
									value={completedHikes}
									onChange={(ev) => setCompletedHikes(ev.target.value)} />
							</Col> */}
							<Col
								xs={2}
								className="d-flex align-items-center justify-content-center"
							>
								<FontAwesomeIcon icon={faCompass} size="xl" />
							</Col>
							<Col>
								<Form.Label>Favorite Difficulty</Form.Label>
								<Form.Select
									value={favouriteDifficulty}
									onChange={(ev) => setFavoriteDifficulty(ev.target.value)}
								>
									<option>Select difficulty</option>
									<option value="Tourist">Tourist</option>
									<option value="Hiker">Hiker</option>
									<option value="Pro Hiker">Pro Hiker</option>
								</Form.Select>
							</Col>
						</Row>
					</Form.Group>
					<hr />
					<Form.Group>
						<Row>
							<Col>
								<Form.Label>Favorite Country</Form.Label>
								<CountrySelect
									country={favouriteCountry}
									setCountry={setFavoriteCountry} />
							</Col>
							<Col
								xs={2}
								className="d-flex align-items-center justify-content-center"
							>
								<FontAwesomeIcon icon={faMap} size="xl" />
							</Col>
							<Col>
								<Form.Label>Favorite Province</Form.Label>
								<ProvinceSelect
									disabled={favouriteCountry === ""}
									province={favouriteProvince}
									setProvince={setFavoriteProvince}
									country={favouriteCountry} />
							</Col>
						</Row>
					</Form.Group>
					<hr />
					<Form.Group>
						<Row>
							<Col>
								<Form.Label>Minimum Distance</Form.Label>
								<InputGroup>
									<Form.Control
										type="number"
										value={minDistance}
										onChange={(ev) => setMinDistance(ev.target.value)} />
									<InputGroup.Text>meters</InputGroup.Text>
								</InputGroup>
							</Col>
							<Col
								xs={2}
								className="d-flex align-items-center justify-content-center"
							>
								<FontAwesomeIcon icon={faHiking} size="xl" />
							</Col>
							<Col>
								<Form.Label>Max Distance</Form.Label>
								<InputGroup>
									<Form.Control
										type="number"
										value={maxDistance}
										onChange={(ev) => setMaxDistance(ev.target.value)} />
									<InputGroup.Text>meters</InputGroup.Text>
								</InputGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Label>Minimum Ascent</Form.Label>
								<InputGroup>
									<Form.Control
										type="number"
										value={minAscent}
										onChange={(ev) => setMinAscent(ev.target.value)} />
									<InputGroup.Text>meters</InputGroup.Text>
								</InputGroup>
							</Col>
							<Col
								xs={2}
								className="d-flex align-items-center justify-content-center"
							>
								<FontAwesomeIcon icon={faMountain} size="xl" />
							</Col>
							<Col>
								<Form.Label>Max Ascent</Form.Label>
								<InputGroup>
									<Form.Control
										type="number"
										value={maxAscent}
										onChange={(ev) => setMaxAscent(ev.target.value)} />
									<InputGroup.Text>meters</InputGroup.Text>
								</InputGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Label>Minimum Time</Form.Label>
								<InputGroup>
									<Form.Control
										type="number"
										value={minTime}
										onChange={(ev) => setMinTime(ev.target.value)} />
									<InputGroup.Text>minutes</InputGroup.Text>
								</InputGroup>
							</Col>
							<Col
								xs={2}
								className="d-flex align-items-center justify-content-center"
							>
								<FontAwesomeIcon icon={faClock} size="xl" />
							</Col>
							<Col>
								<Form.Label>Max Time</Form.Label>
								<InputGroup>
									<Form.Control
										type="number"
										value={maxTime}
										onChange={(ev) => setMaxTime(ev.target.value)} />
									<InputGroup.Text>minutes</InputGroup.Text>
								</InputGroup>
							</Col>
						</Row>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide} variant="secondary">
					Cancel
				</Button>{" "}
				<Button type="submit" onClick={handleSubmit} variant="success">
					Set
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
