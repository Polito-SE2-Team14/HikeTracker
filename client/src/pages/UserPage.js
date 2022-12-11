import { faClock, faCompass, faHiking, faMap, faMountain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import {
	Container,
	Row,
	Col,
	Badge,
	Button,
	Modal,
	Form,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserAPI from "../api/UserAPI";

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
		getStats().then((stats) => {
			setStats(stats);
		});
	}, []);

	return props.user ? (
		<>
			<UserDashboard
				stats={stats}
				user={props.user}
				handleOpenPreferenceForm={handleOpenPreferenceForm}
			/>
			<PreferenceForm
				stats={props.stats}
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

	const handleSubmit = () => {
		let stats = {
			minAscent: 0,
		};

		UserAPI.setUserStats(stats);
	} 

	return (
		<Modal show={props.showPreferenceForm} onHide={props.onHide}>
			<Modal.Header closeButton>Set Preferences</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group>
						<Row>
							<Col>
								<Form.Label>Completed Hikes</Form.Label>
								<Form.Control />
							</Col>
							<Col xs={2} className="d-flex align-items-center justify-content-center">
							<FontAwesomeIcon icon={faCompass} size="xl"/>
							</Col>
							<Col>
								<Form.Label>Favorite Difficulty</Form.Label>
								<Form.Control />
							</Col>
						</Row>
					</Form.Group>
					<hr />
					<Form.Group>
						<Row>
							<Col>
								<Form.Label>Favorite Country</Form.Label>
								<Form.Control />
							</Col>
							<Col xs={2} className="d-flex align-items-center justify-content-center">
							<FontAwesomeIcon icon={faMap} size="xl"/>
							</Col>
							<Col>
								<Form.Label>Favorite Province</Form.Label>
								<Form.Control />
							</Col>
						</Row>
					</Form.Group>
					<hr />
					<Form.Group>
						<Row>
							<Col>
								<Form.Label>Minimum Distance</Form.Label>
								<Form.Control />
							</Col>
							<Col xs={2} className="d-flex align-items-center justify-content-center">
							<FontAwesomeIcon icon={faHiking} size="xl"/>
							</Col>
							<Col>
								<Form.Label>Max Distance</Form.Label>
								<Form.Control />
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Label>Minimum Ascent</Form.Label>
								<Form.Control />
							</Col>
							<Col xs={2} className="d-flex align-items-center justify-content-center">
							<FontAwesomeIcon icon={faMountain} size="xl"/>
							</Col>
							<Col>
								<Form.Label>Max Ascent</Form.Label>
								<Form.Control />
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Label>Minimum Time</Form.Label>
								<Form.Control />
							</Col>
							<Col xs={2} className="d-flex align-items-center justify-content-center">
							<FontAwesomeIcon icon={faClock} size="xl"/>
							</Col>
							<Col>
								<Form.Label>Max Time</Form.Label>
								<Form.Control />
							</Col>
						</Row>
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide} variant="secondary">Cancel</Button>{" "}
				<Button type="submit" onClick={handleSubmit} variant="success">Set</Button>
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
