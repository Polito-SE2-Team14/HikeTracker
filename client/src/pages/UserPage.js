import { useEffect, useState } from "react";
import { Container, Row, Badge, Tabs, Tab, ListGroup } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserAPI from "../api/UserAPI";
import RoleManagement from "../class/RoleManagement";

import "../styles/UserPage.css";
import { UserDashboard } from "../components/Profile/UserDashboard";
import { PreferenceForm } from "../components/Profile/PreferenceForm";
import HikeRecordsAPI from "../api/HikeRecordsAPI";

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
				{RoleManagement.isHiker(props.user) ? (
					<Tabs defaultActiveKey="completed-hikes">
						<Tab eventKey="completed-hikes" title="Completed Hikes">
							<CompletedHikesList user={props.user} />
						</Tab>
						<Tab eventKey="stats" title="Stats">
							<UserDashboard
								stats={stats}
								showStats={showStats}
								user={props.user}
								handleOpenPreferenceForm={handleOpenPreferenceForm}
							/>
						</Tab>
					</Tabs>
				) : (
					false
				)}
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

function CompletedHikesList(props) {
	let [recordList, setRecordList] = useState([]);

	useEffect(() => {
		HikeRecordsAPI.getHikeRecordsForUser(props.user.userID).then((list) => {
			console.log(list);
		});

		// get unique list of tracks
	}, []);

	return (
		<ListGroup variant="flush">
			<ListGroup.Item>aa</ListGroup.Item>
			<ListGroup.Item>bb</ListGroup.Item>
		</ListGroup>
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
