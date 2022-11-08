import "./styles/App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Col, Container, Row } from "react-bootstrap";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { AppNavBar } from "./components/AppNavBar";
import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/UserPage";
import { HomePage } from "./pages/HomePage";
import { HikesPage } from "./pages/HikesPage";
import { HutsPage } from "./pages/HutsPage";
import { ParkingLotsPage } from "./pages/ParkingLotsPage";

function App() {
	let [user, setUser] = useState("Admin"); // TEST
	let [loggedIn, setLoggedIn] = useState(true); // TEST

	return (
		<Router>
			<AppNavBar loggedIn={loggedIn} />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/login"
					element={<LoginPage setLoggedIn={setLoggedIn} />}
				/>
				<Route
					path="/user"
					element={<UserPage user={user} setLoggedIn={setLoggedIn} />}
				/>
				<Route path="/hikes" element={<HikesPage />} />
				<Route path="/huts" element={<HutsPage />} />
				<Route path="/parking-lots" element={<ParkingLotsPage />} />
			</Routes>
		</Router>
	);
}

// TEST
function MapTest() {
	return (
		<Container>
			<Row>
				<Col>
					<p>Ciao</p>
				</Col>
				<Col>
					<div id="map">
						<MapContainer
							center={[51.505, -0.09]}
							zoom={13}
							scrollWheelZoom={false}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<Marker position={[51.505, -0.09]}>
								<Popup>
									A pretty CSS3 popup. <br /> Easily customizable.
								</Popup>
							</Marker>
						</MapContainer>
					</div>
				</Col>
			</Row>
		</Container>
	);
}

export default App;
