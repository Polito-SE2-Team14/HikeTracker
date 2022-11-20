import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { AppNavBar } from "./components/AppNavBar";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { UserPage } from "./pages/UserPage";
import { HomePage } from "./pages/HomePage";
import { HikesPage } from "./pages/HikesPage";
import { HutsPage } from "./pages/HutsPage";
import { ParkingLotsPage } from "./pages/ParkingLotsPage";

//USER API
import userAPI from "./api/UserAPI";

function App() {
	const [user, setUser] = useState(null);
	let [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				let currentUser = await userAPI.getUserInfo(); // we have the user info here
				console.log(currentUser);
				if (currentUser) {
					setUser(currentUser);
					setLoggedIn(true);
				}
			} catch (error) {
				console.log(error);
			}
		};
		checkAuth();
	}, []);

	const handleLogin = async (credentials) => {
		try {
			const currentUser = await userAPI.logIn(credentials);
			setLoggedIn(true);
			setUser(currentUser);
		}
		catch (err) {
			console.log(err);
		}
	};

	const handleLogout = async () => {
		await userAPI.logOut();
		setLoggedIn(false);
		setUser(null);
	};

	return (
		<Router>
			<AppNavBar loggedIn={loggedIn} logout={handleLogout} />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/login"
					element={<LoginPage handleLogin={handleLogin} />}
				/>
				<Route
					path="/registration"
					element={<RegistrationPage setLoggedIn={setLoggedIn} setUser={setUser} />}
				/>
				<Route
					path="/user"
					element={<UserPage user={user} setLoggedIn={setLoggedIn} setUser={setUser} logout={handleLogout} />}
				/>
				<Route path="/hikes" element={<HikesPage user={user} />} />
				<Route path="/huts" element={<HutsPage user={user} />} />
				<Route path="/parking-lots" element={<ParkingLotsPage />} />
			</Routes>
		</Router>
	);
}

export default App;
