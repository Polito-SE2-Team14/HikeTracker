import UserAPI from "../api/UserAPI";

import "../styles/LoginPage.css";

import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { RegistrationForm } from "../components/RegistrationForm";

export function RegistrationPage(props) {
	let navigate = useNavigate();

	let [message, setMessage] = useState("");

	let handleRegistration = async (credentials) => {
		try {
			await UserAPI.Register(credentials);

			props.setLoggedIn(true);
			navigate("/");
		}
		catch(e){
			setMessage(e);
		}
	};

	return (
		<Container className="login-form">
			<Row>
				<h1>Register</h1>
			</Row>
			<Row>
				<RegistrationForm
					message={message}
					setMessage={setMessage}
					register={handleRegistration}
				/>
			</Row>
		</Container>
	);
}
