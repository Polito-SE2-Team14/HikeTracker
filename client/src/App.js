import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { AppNavBar } from "./components/AppNavBar";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { UserPage } from "./pages/UserPage";
import { UserVerificationPage } from "./pages/UserVerificationPage";
import { HomePage } from "./pages/HomePage";
import { HikesPage } from "./pages/HikesPage";
import { HutsPage } from "./pages/HutsPage";
import { ParkingLotsPage } from "./pages/ParkingLotsPage";

//USER API
import userAPI from "./api/UserAPI";

function App() {
	const [user, setUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);
	const [userType, setUserType] = useState(null)
	const [message, setMessage] = useState("");

	useEffect(() => {
		const checkAuth = async () => {
			try {
				let currentUser = await userAPI.getUserInfo(); // we have the user info here
				console.log(currentUser);
				if (currentUser) {
					setUser(currentUser);
					setLoggedIn(true);
					setUserType(currentUser.type);
					console.log("user", user)
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
			setUserType(currentUser.type);
			setMessage("");
			return true
		}
		catch (err) {
			setMessage("Email/Password Incorrect")
			console.log(err);
			return false
		}
	};

	const handleLogout = async () => {
		await userAPI.logOut();
		setLoggedIn(false);
		setUser(null);
		setUserType(null);
		setMessage("");
	};

	return (
		<Router>
			<AppNavBar loggedIn={loggedIn} logout={handleLogout} />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route
					path="/login"
					element={<LoginPage handleLogin={handleLogin} message={message} setMessage={setMessage} />}
				/>
				<Route
					path="/registration"
					element={<RegistrationPage setLoggedIn={setLoggedIn} setUser={setUser} />}
				/>
				<Route
					path="/user"
					element={<UserPage user={user} setLoggedIn={setLoggedIn} setUser={setUser} logout={handleLogout} />}
				/>
				<Route path="/user/verify/:token" element={<UserVerificationPage user={user}/>} />
				<Route path="/hikes" element={<HikesPage user={user} />} />
				<Route path="/huts" element={<HutsPage user={user} />} />
				<Route path="/parking-lots" element={<ParkingLotsPage />} />
			</Routes>
		</Router>
	);
}

export default App;
