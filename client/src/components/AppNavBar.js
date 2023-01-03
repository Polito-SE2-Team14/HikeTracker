import "../styles/AppNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faCircleUser,
	faRightToBracket,
	faCarSide,
	faHouse,
	faPersonHiking,
	faCompass,
	faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import RoleManagement from "../class/RoleManagement";
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

	let handlePageSelect = function(page){
		setShowSidebar(false);
		navigate(page);
	};

	const navDropdownTitleForUser = <FontAwesomeIcon icon={faCircleUser} />;

	return (
		<>
			<Navbar bg="transparent" className="mountain-bg font-weight-bold">
				<Container fluid className="d-flex justify-content-center">
					<Row className="navbar-items d-flex justify-content-between">
						<Col
							xs={1}
							className="d-flex align-items-center justify-content-center"
						>
							<Button variant="navbar" onClick={handleMenuClick}>
								<FontAwesomeIcon icon={faBars} />
							</Button>
						</Col>
						<Col className="d-flex align-items-center justify-content-center">
							<Button variant="navbar" size="xl" onClick={handleHomeClick}>
								HIKEfive!
							</Button>
						</Col>
						<Col
							xs={1}
							className="d-flex align-items-center justify-content-center"
						>
							{props.loggedIn ? (
								<NavDropdown
									title={navDropdownTitleForUser}
									id="collasible-nav-dropdown"
									drop="start"
								>
									<NavDropdown.Item onClick={handleUserClick}>
										Profile
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item onClick={handleLogout}>
										Log Out
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Button variant="navbar" onClick={handleUserClick}>
									<FontAwesomeIcon icon={faRightToBracket} />
								</Button>
							)}
						</Col>
					</Row>
				</Container>
			</Navbar>
			<SideBar
				user={props.user}
				show={showSidebar}
				pageSelect={handlePageSelect}
				onHide={handleCloseClick}
			/>
		</>
	);
}

function SideBar(props) {
	
	let selectEmpty=function(){
		props.pageSelect("/")
	}
	let selectAdmin=function(){
		props.pageSelect("/admin")
	}
	let selectHikes=function(){
		props.pageSelect("/hikes")
	}
	let selectHuts=function(){
		props.pageSelect("/huts")
	}
	let selectParkingLots=function(){
		props.pageSelect("/parking-lots")
	}


	return (
		<Offcanvas show={props.show} onHide={props.onHide}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>
					<h1>Explore</h1>
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<ListGroup variant="flush">
					{RoleManagement.isManager(props.user) ? (
						<ListGroup.Item action onClick={selectAdmin}>
							<SideBarElement
								icon={<FontAwesomeIcon icon={faClipboardList} />}
								name="Admin Page"
							/>
						</ListGroup.Item>
					) : null}

					<ListGroup.Item action onClick={selectEmpty}>
						<SideBarElement
							icon={<FontAwesomeIcon icon={faCompass} />}
							name="Home Page"
						/>
					</ListGroup.Item>

					<ListGroup.Item action onClick={selectHikes}>
						<SideBarElement
							icon={<FontAwesomeIcon icon={faPersonHiking} />}
							name="Hikes"
						/>
					</ListGroup.Item>
					<ListGroup.Item action onClick={selectHuts}>
						<SideBarElement
							icon={<FontAwesomeIcon icon={faHouse} />}
							name="Huts"
						/>
					</ListGroup.Item>
					<ListGroup.Item
						action
						onClick={selectParkingLots}
					>
						<SideBarElement
							icon={<FontAwesomeIcon icon={faCarSide} />}
							name="Parking lots"
						/>
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
