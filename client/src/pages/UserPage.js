import { useEffect, useState } from "react";
import { Container, Row, Badge, Tabs, Tab } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import UserAPI from "../api/UserAPI";
import RoleManagement from "../class/RoleManagement";

import "../styles/UserPage.css";
import { UserDashboard } from "../components/Profile/UserDashboard";
import { PreferenceForm } from "../components/Profile/PreferenceForm";
import { CompletedHikesList } from "../components/Profile/CompletedHikesList";

export function UserPage(props) {
	const [stats, setStats] = useState({});
	const [showStats, setShowStats] = useState(false);
	const [showPreferenceForm, setShowPreferenceForm] = useState(false);

	const getStats = async function(){
		return await UserAPI.getUserStats();
	};

	let handleOpenPreferenceForm = function(){
		setShowPreferenceForm(true);
	};

	let handleClosePreferenceForm = function(){
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

function UserBadges(props) {
	let badges = {
		manager: <Badge bg="danger">Manager</Badge>,
		hiker: <Badge bg="success">Hiker</Badge>,
		localGuide: <Badge bg="primary">Local guide</Badge>,
		hutWorker: <Badge bg="warning">Hut worker</Badge>,
	};

	return badges[props.user.type];
}
