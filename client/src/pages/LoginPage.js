import "../styles/LoginPage.css";

import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { LoginForm } from "../components/LoginComponents";

export function LoginPage(props) {
	let navigate = useNavigate();

	let [message, setMessage] = useState("");

	let handleRegistration = () => navigate("/registration");

	return (
		<Container className="login-form">
			<Row>
				<h1>Login</h1>
			</Row>
			<Row>
				<LoginForm
					message={message}
					setMessage={setMessage}
					login={props.handleLogin}
				/>
			</Row>
			<Row>OR</Row>
			<Row><Button type="button" onClick={handleRegistration}>Register</Button></Row>
		</Container>
	);
};
