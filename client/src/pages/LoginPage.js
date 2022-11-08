import "../styles/LoginPage.css";

import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { LoginForm } from "../components/LoginComponents";

export function LoginPage(props) {
	let navigate = useNavigate();

	let [message, setMessage] = useState("");

	let handleLogin = (credentials) => {
		// TODO: Authentication with server
		props.setLoggedIn(true);
		navigate("/");
	};

	return (
		<Container className="login-form">
			<Row>
				<h1>Login</h1>
			</Row>
			<Row>
				<LoginForm
					message={message}
					setMessage={setMessage}
					login={handleLogin}
				/>
			</Row>
		</Container>
	);
}
