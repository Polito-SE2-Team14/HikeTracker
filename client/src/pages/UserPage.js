import { Avatar } from "@mui/material";
import { Container, Row, Col, Badge } from "react-bootstrap";

import "../styles/UserPage.css";

export function UserPage(props) {
	let style = {
		position: "20",
	};

	return (
		<Container>
			<Row className="mt-4 stats ">
				<Col>
					<Row className="mt-3">
						<h1>{`${props.user.name} ${props.user.surname}`}</h1>
					</Row>
					<Row className="d-flex align-items-center">
						<UserBadges />
					</Row>
					<hr/>
					<Row>
						<Col className="text-end">
						Status: Verified/Pending
						</Col>
					</Row>
				</Col>
			</Row>
			<Row className="d-flex justify-content-center stats mb-5">
				<Row className="mt-5">
					<h2>Stats</h2>
					<b>Number of Completed hikes: </b>
					<b>Favorite Difficulty: </b>
					<b>Favorite Country: </b>
					<b>Favorite Province: </b>
				</Row>
				<Row
					className=" d-flex justify-content-center mt-5"
					xs={1}
					md={2}
					xl={3}
				>
					<Col className="mt-3">
						<Row>
							<h4>Distance</h4>
							<b>Total distance: </b>
							<b>Shortest distance: </b>
							<b>Longest distance: </b>
							<b>Average distance: </b>
						</Row>
					</Col>
					<Col className="mt-3">
						<Row>
							<h4>Ascent</h4>
							<b>Shortest ascent: </b>
							<b>Longest ascent: </b>
							<b>Average ascent: </b>
						</Row>
					</Col>
					<Col className="mt-3">
						<Row>
							<h4>Time</h4>
							<b>Total time: </b>
							<b>Shortest time: </b>
							<b>Longest time: </b>
							<b>Average time: </b>
						</Row>
					</Col>
				</Row>
			</Row>
		</Container>
	);
}

function UserBadges(props) {
	return (
		<span>
			<Badge bg="success">Hiker</Badge>{" "}
			<Badge bg="primary">Local guide</Badge>{" "}
			<Badge bg="danger">Hut worker</Badge>{" "}
		</span>
	);
}
