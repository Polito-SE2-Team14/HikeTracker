import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

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
import { UserNotApprovedPage } from "./pages/UserNotApprovedPage";

function App() {
	const [user, setUser] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [isApproved, setIsApproved] = useState(false);
	const [message, setMessage] = useState("");

	useEffect(() => {
		const checkAuth = async () => {
			try {
				let currentUser = await userAPI.getUserInfo(); // we have the user info here
				//console.log(currentUser);
				if (currentUser) {
					setUser(currentUser);
					setLoggedIn(true);
					setIsApproved(currentUser.approved === 1 ? true : false);
					setIsVerified(currentUser.verified === 1 ? true : false);
					//console.log("user", user)
				}
			} catch (error) {
				console.error(error);
			}
		};
		checkAuth();
	}, [loggedIn]);

	const handleLogin = async (credentials) => {
		try {
			const currentUser = await userAPI.logIn(credentials);
			console.log(currentUser);
			setLoggedIn(true);
			setUser(currentUser);
			setIsApproved(currentUser.approved === 1 ? true : false);
			setIsVerified(currentUser.verified === 1 ? true : false);
			setMessage("");
			return true
		}
		catch (err) {
			setMessage("Email/Password Incorrect")
			console.error(err);
			return false
		}
	};

	const handleLogout = async () => {
		await userAPI.logOut();
		setLoggedIn(false);
		setUser(null);
		setIsVerified(false);
		setIsApproved(false);
		setMessage("");
	}

	return (
		<Router>
			<AppNavBar loggedIn={loggedIn} logout={useCallback(() => handleLogout, [])} user={user} />
			<Routes>
				<Route path="/" element={<HomePage loggedIn={loggedIn} verified={isVerified} approved={isApproved} user={user} />} />
				<Route
					path="/admin"
					element={RoleManagement.isManager(user) ? <AdminPage /> : <Navigate replace to='/' />}
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
					element={<UserPage user={user} setLoggedIn={setLoggedIn} setUser={setUser} logout={useCallback(() => handleLogout, [])} />}
				/>
				<Route path="/user/verify/:token" element={<UserVerificationPage user={user} setIsVerified={setIsVerified} />} />
				<Route path="/hikes" element={<HikesPage user={user} />} />
				<Route path="/huts" element={<HutsPage user={user} />} />
				<Route path="/parking-lots" element={<ParkingLotsPage user={user} />} />
				<Route path="/not-verified" element={(loggedIn && !isVerified) ? <UserNotVerifiedPage user={user} /> : <Navigate replace to='/' />} />
				<Route path="/not-approved" element={(loggedIn && !isApproved) ? <UserNotApprovedPage /> : <Navigate replace to='/' />} />
			</Routes>
		</Router>
	);
}

export default App;
