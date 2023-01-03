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
	Tabs,
	Tab,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserAPI from "../api/UserAPI";
import RoleManagement from "../class/RoleManagement";

import { CountrySelect, ProvinceSelect } from "../components/CoMunProvSelect";

import "../styles/UserPage.css";

export function UserPage(props) {
	const [stats, setStats] = useState({});
	const [showStats, setShowStats] = useState(false);
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
		if (!showPreferenceForm)
			getStats()
				.then((stats) => {
					setStats(stats);
					if (RoleManagement.isHiker(props.user)) {
						setShowStats(true);
					}
				})
				.catch(setShowStats(false));
	}, [showPreferenceForm]);

	return props.user ? (
		<>
			<Container className="mt-4">
				<Row className="mt-3">
					<h1>{`${props.user.name} ${props.user.surname}`}</h1>
				</Row>
				<UserBadges user={props.user} />
				<hr />
				{RoleManagement.isHiker(props.user) ? <Tabs defaultActiveKey="completed-hikes">
					<Tab eventKey="completed-hikes" title="Completed Hikes">
						frontend is my cross and i must carry it
					</Tab>
					<Tab eventKey="stats" title="Stats">
						<UserDashboard
							stats={stats}
							showStats={showStats}
							user={props.user}
							handleOpenPreferenceForm={handleOpenPreferenceForm}
						/>
					</Tab>
				</Tabs> : false}
			</Container>
			<PreferenceForm
				stats={stats}
				setShowStats={setShowStats}
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

	const handleSubmit = (ev) => {
		ev.preventDefault();

		console.log(props.user);
		let stats = {
			userID: props.user.userID,
			completedHikes: completedHikes,
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
		if (props.stats == false) {
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
									province={favouriteProvince}
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
	// console.log(props.stats)

	return (
		<>
			<Row className="mt-4 stats ">
				<Col>
					{RoleManagement.isHiker(props.user) ? (
						<Row>
							<Col>
								<Button onClick={props.handleOpenPreferenceForm}>
									Set preferences
								</Button>
							</Col>
							{(RoleManagement.isHutWorker(props.user) ||
								RoleManagement.isLocalGuide(props.user)) && (
								<Col className="text-end">
									{`Status: ${
										props.user.approved > 0 ? "Approved" : "Pending"
									}`}
								</Col>
							)}
						</Row>
					) : (
						false
					)}
				</Col>
			</Row>
			{RoleManagement.isHiker(props.user) ? (
				<Row className="d-flex justify-content-center stats mb-5">
					{props.showStats && props.stats != false ? (
						<>
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
										{/* <span>
														<b>Total distance: </b>
														{`${props.stats.totalDistance} meters`}
													</span> */}
										<span>
											<b>Shortest distance: </b>
											{`${props.stats.minDistance} meters`}
										</span>
										<span>
											<b>Longest distance: </b>
											{`${props.stats.maxDistance} meters`}
										</span>
										{/* <span>
														<b>Average distance: </b>
														{`${props.stats.averageDistance} meters`}
													</span> */}
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
										{/* <span>
														<b>Average ascent: </b>
														{`${props.stats.averageAscent} meters`}
													</span> */}
									</Row>
								</Col>
								<Col className="mt-3">
									<Row>
										<h4>Time</h4>
										{/* <span>
														<b>Total time: </b>
														{`${props.stats.totalTime} meters`}
													</span> */}
										<span>
											<b>Shortest time: </b>
											{`${props.stats.minTime} minutes`}
										</span>
										<span>
											<b>Longest time: </b>
											{`${props.stats.maxTime} minutes`}
										</span>
										{/* <span>
														<b>Average time: </b>
														{`${props.stats.averageTime} meters`}
													</span> */}
									</Row>
								</Col>
							</Row>
						</>
					) : (
						<Row className="text-secondary mt-5">
							No activity recorded: take your mountain boots and go somewhere!{" "}
						</Row>
					)}
				</Row>
			) : (
				false
			)}
		</>
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
