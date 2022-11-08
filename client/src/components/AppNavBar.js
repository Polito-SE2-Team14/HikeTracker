import "../styles/AppNavBar.css";

import {
	List,
	Person,
	PersonCircle,
	CarFrontFill,
	HouseFill,
	SignpostSplitFill,
	CompassFill,
} from "react-bootstrap-icons";
import {
	Button,
	Col,
	Container,
	Navbar,
	Offcanvas,
	Row,
	ListGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function AppNavBar(props) {
	let navigate = useNavigate();

	let [showSidebar, setShowSidebar] = useState(false);

	let handleMenuClick = () => {
		setShowSidebar(true);
	};

	let handleCloseClick = () => {
		setShowSidebar(false);
	};

	let handleHomeClick = () => {
		navigate("/");
	};

	let handleUserClick = () => {
		props.loggedIn ? navigate("/user") : navigate("/login");
	};

	let handlePageSelect = (page) => {
		setShowSidebar(false);
		navigate(page);
	};

	return (
		<>
			<Navbar bg="transparent" className="mountain-bg">
				<Container fluid className="d-flex justify-content-center">
					<Row className="navbar-items d-flex justify-content-between">
						<Col className="d-flex align-items-center">
							<Button variant="navbar" onClick={handleMenuClick}>
								<List />
							</Button>
						</Col>
						<Col className="d-flex align-items-center justify-content-center">
							<Button variant="navbar" size="xl" onClick={handleHomeClick}>
								HIKEfive!
							</Button>
						</Col>
						<Col className="d-flex align-items-center justify-content-end">
							<Button variant="navbar" onClick={handleUserClick}>
								{props.loggedIn ? <PersonCircle /> : <Person />}
							</Button>
						</Col>
					</Row>
				</Container>
			</Navbar>
			<SideBar show={showSidebar} pageSelect={handlePageSelect} onHide={handleCloseClick} />
		</>
	);
}

function SideBar(props) {
	return (
		<Offcanvas show={props.show} onHide={props.onHide}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>
					<h1>Explore</h1>
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<ListGroup variant="flush">
					<ListGroup.Item action onClick={() => props.pageSelect("/")}>
						<SideBarElement icon={<CompassFill />} name="Home Page" />
					</ListGroup.Item>
					<ListGroup.Item action onClick={() => props.pageSelect("/hikes")}>
						<SideBarElement icon={<SignpostSplitFill />} name="Hikes" />
					</ListGroup.Item>
					<ListGroup.Item action onClick={() => props.pageSelect("/huts")}>
						<SideBarElement icon={<HouseFill />} name="Huts" />
					</ListGroup.Item>
					<ListGroup.Item
						action
						onClick={() => props.pageSelect("/parking-lots")}
					>
						<SideBarElement icon={<CarFrontFill />} name="Parking lots" />
					</ListGroup.Item>
				</ListGroup>
			</Offcanvas.Body>
		</Offcanvas>
	);
}

function SideBarElement(props) {
	return (
		<Container className="sidebar-item">
			{props.icon} {props.name}
		</Container>
	);
}
