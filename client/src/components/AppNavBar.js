import "../styles/AppNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser, faRightToBracket, faCarSide, faHouse, faPersonHiking, faCompass, faClipboardList } from "@fortawesome/free-solid-svg-icons";

import {
	Button,
	Col,
	Container,
	Navbar,
	Offcanvas,
	Row,
	ListGroup,
	NavDropdown,
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

	let handleLogout = () => {
		props.logout();
		navigate("/");
	};

	let handlePageSelect = (page) => {
		setShowSidebar(false);
		navigate(page);
	};

	const navDropdownTitleForUser = <FontAwesomeIcon icon={faCircleUser} />;

	return (
		<>
			<Navbar bg="transparent" className="mountain-bg font-weight-bold">
				<Container fluid className="d-flex justify-content-center">
					<Row className="navbar-items d-flex justify-content-between">
						<Col className="d-flex align-items-center">
							<Button variant="navbar" onClick={handleMenuClick}>
								<FontAwesomeIcon icon={faBars} />
							</Button>
						</Col>
						<Col className="d-flex align-items-center justify-content-center">
							{
								//TODO add icon
							} 
							<Button variant="navbar" size="xl" onClick={handleHomeClick}>
								HIKEfive!
							</Button>
						</Col>
						<Col className="d-flex align-items-center justify-content-end">
							{ props.loggedIn ?

								<NavDropdown title={navDropdownTitleForUser} id="collasible-nav-dropdown" drop='start'>
									<NavDropdown.Item onClick={handleUserClick}>Profile</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={handleLogout}>
										Log Out
									</NavDropdown.Item>
								</NavDropdown>

								:
								<Button variant="navbar" onClick={handleUserClick}>
									<FontAwesomeIcon icon={faRightToBracket} />
								</Button>
							}
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
				<ListGroup.Item action onClick={() => props.pageSelect("/admin")}>
						<SideBarElement icon={<FontAwesomeIcon icon={faClipboardList} />} name="Admin Page" />
					</ListGroup.Item>
					<ListGroup.Item action onClick={() => props.pageSelect("/")}>
						<SideBarElement icon={<FontAwesomeIcon icon={faCompass} />} name="Home Page" />
					</ListGroup.Item>
					<ListGroup.Item action onClick={() => props.pageSelect("/hikes")}>
						<SideBarElement icon={<FontAwesomeIcon icon={faPersonHiking} />} name="Hikes" />
					</ListGroup.Item>
					<ListGroup.Item action onClick={() => props.pageSelect("/huts")}>
						<SideBarElement icon={<FontAwesomeIcon icon={faHouse} />} name="Huts" />
					</ListGroup.Item>
					<ListGroup.Item
						action
						onClick={() => props.pageSelect("/parking-lots")}
					>
						<SideBarElement icon={<FontAwesomeIcon icon={faCarSide} />} name="Parking lots" />
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
