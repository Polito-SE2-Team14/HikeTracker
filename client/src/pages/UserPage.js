import {
	faClock,
	faCompass,
	faHiking,
	faMap,
	faMountain,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
	Container,
	Row,
	Col,
	Badge,
	Button,
	Modal,
	Form,
	InputGroup,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserAPI from "../api/UserAPI";

import { CountrySelect, ProvinceSelect } from "../components/CoMunProvSelect";

import "../styles/UserPage.css";

export function UserPage(props) {
	const [stats, setStats] = useState({});
	const [showPreferenceForm, setShowPreferenceForm] = useState(false);

	const getStats = async () => {
		return await UserAPI.getUserStats();
	};

	const handleOpenPreferenceForm = () => {
		setShowPreferenceForm(true);
	};

	const handleClosePreferenceForm = () => {
		setShowPreferenceForm(false);
	};

	useEffect(() => {
		if(!showPreferenceForm)
			getStats().then((stats) => {
				setStats(stats);
			});
	}, [showPreferenceForm]);

	return props.user ? (
		<>
			<UserDashboard
				stats={stats}
				user={props.user}
				handleOpenPreferenceForm={handleOpenPreferenceForm}
			/>
			<PreferenceForm
				stats={stats}
				setStats={setStats}
				user={props.user}
				showPreferenceForm={showPreferenceForm}
				onHide={handleClosePreferenceForm}
			/>
		</>
	) : (
		<Navigate to="/" />
	);
}

function PreferenceForm(props) {
	const [completedHikes, setCompletedHikes] = useState(
		props.stats.completedHikes ? props.stats.completedHikes : 0
	);
	const [favoriteDifficulty, setFavoriteDifficulty] = useState(
		props.stats.favoriteDifficulty ? props.stats.favoriteDifficulty : ""
	);

	const [favouriteCountry, setFavoriteCountry] = useState(
		props.stats.favouriteCountry ? props.stats.favouriteCountry : ""
	);
	const [favoriteProvince, setFavoriteProvince] = useState(
		props.stats.favoriteProvince ? props.stats.favoriteProvince : ""
	);

	const [minDistance, setMinDistance] = useState(props.stats.minDistance ? props.stats.minDistance : 0);
	const [maxDistance, setMaxDistance] = useState(props.stats.maxDistance ? props.stats.maxDistance : 0);

	const [minAscent, setMinAscent] = useState(props.stats.minAscent ? props.stats.minAscent : 0);
	const [maxAscent, setMaxAscent] = useState(props.stats.maxAscent ? props.stats.maxAscent : 0);

	const [minTime, setMinTime] = useState(props.stats.minTime ? props.stats.minTime : 0);
	const [maxTime, setMaxTime] = useState(props.stats.maxTime ? props.stats.maxTime : 0);

	const handleSubmit = (ev) => {
		ev.preventDefault();

		let stats = {
			completedHikes: completedHikes,
			favoriteDifficulty: favoriteDifficulty,
			favouriteCountry: favouriteCountry,
			favoriteProvince: favoriteProvince,
			minDistance: minDistance,
			maxDistance: maxDistance,
			minAscent: minAscent,
			maxAscent: minAscent,
			minTime: minTime,
			maxTime: maxTime,
		};

		UserAPI.setUserStats(stats);
		props.setStats(stats);
	};

	return (
		<Modal show={props.showPreferenceForm} onHide={props.onHide}>
			<Modal.Header closeButton>Set Preferences</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Row>
							<Col>
								<Form.Label>Completed Hikes</Form.Label>
								<Form.Control
									type="number"
									value={completedHikes}
									onChange={(ev) => setCompletedHikes(ev.target.value)}
								/>
							</Col>
							<Col
								xs={2}
								className="d-flex align-items-center justify-content-center"
							>
								<FontAwesomeIcon icon={faCompass} size="xl" />
							</Col>
							<Col>
								<Form.Label>Favorite Difficulty</Form.Label>
								<Form.Select
									value={favoriteDifficulty}
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
									setCountry={setFavoriteCountry}
								/>
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
									province={favoriteProvince}
									setProvince={setFavoriteProvince}
									country={favouriteCountry}
								/>
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
										onChange={(ev) => setMinDistance(ev.target.value)}
									/>
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
										onChange={(ev) => setMaxDistance(ev.target.value)}
									/>
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
										onChange={(ev) => setMinAscent(ev.target.value)}
									/>
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
										onChange={(ev) => setMaxAscent(ev.target.value)}
									/>
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
										onChange={(ev) => setMinTime(ev.target.value)}
									/>
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
										onChange={(ev) => setMaxTime(ev.target.value)}
									/>
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

function UserDashboard(props) {
	return (
		<Container>
			<Row className="mt-4 stats ">
				<Col>
					<Row className="mt-3">
						<h1>{`${props.user.name} ${props.user.surname}`}</h1>
					</Row>
					<UserBadges user={props.user} />
					<hr />
					<Row>
						<Col>
							<Button onClick={props.handleOpenPreferenceForm}>
								Set preferences
							</Button>
						</Col>
						<Col className="text-end">
							{`Status: ${props.user.verified > 0 ? "Verified" : "Pending"}`}
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className="d-flex justify-content-center stats mb-5">
				<Row className="mt-2">
					<h2>Stats</h2>
					<span>
						<b>Number of Completed hikes: </b>
						{`${props.stats.completedHikes}`}
					</span>
					<span>
						<b>Favorite Difficulty: </b>
						{`${props.stats.favouriteDifficulty}`}
					</span>
					<span>
						<b>Favorite Country: </b>
						{`${props.stats.favouriteCountry}`}
					</span>
					<span>
						<b>Favorite Province: </b>
						{`${props.stats.favouriteProvince}`}
					</span>
				</Row>
				<Row className="d-flex justify-content-center mt-5" xs={1} xl={3}>
					<Col className="mt-3">
						<Row>
							<h4>Distance</h4>
							<span>
								<b>Total distance: </b>
								{`${props.stats.totalDistance} meters`}
							</span>
							<span>
								<b>Shortest distance: </b>
								{`${props.stats.minDistance} meters`}
							</span>
							<span>
								<b>Longest distance: </b>
								{`${props.stats.maxDistance} meters`}
							</span>
							<span>
								<b>Average distance: </b>
								{`${props.stats.averageDistance} meters`}
							</span>
						</Row>
					</Col>
					<Col className="mt-3">
						<Row>
							<h4>Ascent</h4>
							<span>
								<b>Shortest ascent: </b>
								{`${props.stats.minAscent} meters`}
							</span>
							<span>
								<b>Longest ascent: </b>
								{`${props.stats.maxAscent} meters`}
							</span>
							<span>
								<b>Average ascent: </b>
								{`${props.stats.averageAscent} meters`}
							</span>
						</Row>
					</Col>
					<Col className="mt-3">
						<Row>
							<h4>Time</h4>
							<span>
								<b>Total time: </b>
								{`${props.stats.totalTime} meters`}
							</span>
							<span>
								<b>Shortest time: </b>
								{`${props.stats.minTime} meters`}
							</span>
							<span>
								<b>Longest time: </b>
								{`${props.stats.maxTime} meters`}
							</span>
							<span>
								<b>Average time: </b>
								{`${props.stats.averageTime} meters`}
							</span>
						</Row>
					</Col>
				</Row>
			</Row>
		</Container>
	);
}

function UserBadges(props) {
	let badges = {
		manager: <Badge bg="danger">Manager</Badge>,
		hiker: <Badge bg="success">Hiker</Badge>,
		localGuide: <Badge bg="primary">Local guide</Badge>,
		hutWorker: <Badge bg="warning">Hut worker</Badge>,
	};

	return badges[props.user.type];
}
