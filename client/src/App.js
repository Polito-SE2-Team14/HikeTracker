import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { AppNavBar } from "./components/AppNavBar";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { UserPage } from "./pages/UserPage";
import { HomePage } from "./pages/HomePage";
import { HikesPage } from "./pages/HikesPage";
import { HutsPage } from "./pages/HutsPage";
import { ParkingLotsPage } from "./pages/ParkingLotsPage";

function App() {
	let [user, setUser] = useState({name: "Admin", type:"Local guide"}); // TEST
	let [loggedIn, setLoggedIn] = useState(true); // TEST

	return (
		<Router>
			<AppNavBar loggedIn={loggedIn} />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/login"
					element={<LoginPage setLoggedIn={setLoggedIn} setUser={setUser}/>}
				/>
				<Route
					path="/registration"
					element={<RegistrationPage setLoggedIn={setLoggedIn} setUser={setUser}/>}
				/>
				<Route
					path="/user"
					element={<UserPage user={user} setLoggedIn={setLoggedIn} setUser={setUser}/>}
				/>
				<Route path="/hikes" element={<HikesPage user={user}/>} />
				<Route path="/huts" element={<HutsPage />} />
				<Route path="/parking-lots" element={<ParkingLotsPage />} />
			</Routes>
		</Router>
	);
}

export default App;
