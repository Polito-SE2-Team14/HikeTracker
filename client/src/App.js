import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { AppNavBar } from "./components/AppNavBar";
import { LoginPage } from "./pages/LoginPage";
import { RegistrationPage } from "./pages/RegistrationPage";
import { UserPage } from "./pages/UserPage";
import { UserVerificationPage } from "./pages/UserVerificationPage";
import { UserNotVerifiedPage } from "./pages/UserNotVerifiedPage";
import { HomePage } from "./pages/HomePage";
import { HikesPage } from "./pages/HikesPage";
import { HutsPage } from "./pages/HutsPage";
import { ParkingLotsPage } from "./pages/ParkingLotsPage";

// Role Management
import RoleManagement from "./class/RoleManagement";

//USER API
import userAPI from "./api/UserAPI";
import { AdminPage } from "./pages/AdminPage";

function App() {
	const [user, setUser] = useState({});
	const [loggedIn, setLoggedIn] = useState(false);
	const [userType, setUserType] = useState(null);
	const [isVerified, setIsVerified] = useState(false);
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
					setIsVerified(currentUser.verified === 1 ? true : false);
					console.log("user", user)
				}
			} catch (error) {
				console.log(error);
			}
		};
		checkAuth();
	}, [loggedIn]);

	const handleLogin = async (credentials) => {
		try {
			const currentUser = await userAPI.logIn(credentials);
			setLoggedIn(true);
			setUser(currentUser);
			setUserType(currentUser.type);
			setIsVerified(currentUser.verified === 1 ? true : false);
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
		setIsVerified(false);
		setMessage("");
	};

	return (
		<Router>
			<AppNavBar loggedIn={loggedIn} logout={handleLogout} userType={userType} />
			<Routes>
				<Route path="/" element={!loggedIn || (loggedIn && isVerified) ? <HomePage /> : <Navigate replace to='/not-verified' />} />
				<Route
					path="/admin"
					element={<AdminPage />}
				/>
				<Route
					path="/login"
					element={loggedIn ? <Navigate replace to='/' /> : <LoginPage handleLogin={handleLogin} message={message} setMessage={setMessage} />}
				/>
				<Route
					path="/registration"
					element={<RegistrationPage setLoggedIn={setLoggedIn} setUser={setUser} />}
				/>
				<Route
					path="/user"
					element={<UserPage user={user} setLoggedIn={setLoggedIn} setUser={setUser} logout={handleLogout} />}
				/>
				<Route path="/user/verify/:token" element={<UserVerificationPage user={user} setIsVerified={setIsVerified} />} />
				<Route path="/hikes" element={<HikesPage user={user} userType={userType} />} />
				<Route path="/huts" element={<HutsPage user={user} />} />
				<Route path="/parking-lots" element={<ParkingLotsPage user={user} />} />
				<Route path="/not-verified" element={(loggedIn && !isVerified) ? <UserNotVerifiedPage user={user} /> : <Navigate replace to='/' />} />
			</Routes>
		</Router>
	);
}

export default App;
