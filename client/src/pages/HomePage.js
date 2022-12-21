import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RoleManagement from "../class/RoleManagement";

export function HomePage(props) {
	return (
		<Container className="text-center">
			Logo <br />
			<CatchPhrase />
			<WelcomePhrase user={props.user} />
			<NavCardList />
		</Container>
	);
}

function CatchPhrase() {
	return (
		<div style={{fontSize:"4rem"}}>
			<Row>
				<span>
					Your <span className="fw-bold">BEST COMPANION</span> for
				</span>
			</Row>
			<Row>
				<span>
					your <span className="fw-bold">BEST HIKES</span>!
				</span>
			</Row>
		</div>
	);
}

function WelcomePhrase(props) {
	let component;

	if (props.user) {
		component = (
			<div className="mt-4">
				Welcome <span className="fw-bold"> {props.user.name.toUpperCase()} </span>
				{!RoleManagement.isHiker(props.user) ? (
					<div>if logged in start a new hike / continue the one started</div>
				) : (
					false
				)}
			</div>
		);
	} else {
		component = false;
	}

	return component;
}

function NavCardList() {
	return (
		<Row className="d-flex justify-content-center">
			<Col md={12} xl={3} className="me-3">
				<NavCard
					title="Hikes"
					image="https://images-prod.healthline.com/hlcmsresource/images/topic_centers/2019-8/couple-hiking-mountain-climbing-1296x728-header.jpg"
					page="hikes"
				/>
			</Col>
			<Col md={12} xl={3} className="me-3">
				<NavCard
					title="Huts"
					image="https://www.journeyera.com/wp-content/uploads/2019/09/swiss-mountain-hut-0617-1024x685.jpg.webp"
					page="huts"
				/>
			</Col>
			<Col md={12} xl={3} className="me-3">
				<NavCard
					title="Parking lots"
					image="https://www.kai-pavement.com/files/img_84461817343196.jpg"
					page="parking-lots"
				/>
			</Col>
		</Row>
	);
}

function NavCard(props) {
	let navigate = useNavigate();

	return (
		<Card className="mb-3 mt-4">
			<CardActionArea onClick={() => navigate(`/${props.page}`)}>
				<CardMedia component="img" height="240" image={props.image} />
				<CardContent>
					<Typography gutterBottom align="center" variant="h4" component="div">
						{props.title}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
