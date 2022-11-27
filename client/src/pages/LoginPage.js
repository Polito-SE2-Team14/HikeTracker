import "../styles/LoginPage.css";

import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { LoginForm } from "../components/LoginComponents";

export function LoginPage(props) {
	let navigate = useNavigate();

	let handleRegistration = () => navigate("/registration");

	return (
		<Container className="login-form">
			<Row>
				<Col xs={3} />
				<Col xs={6} >
					<Row>
						<h1>Login</h1>
					</Row>
					<Row>
						<LoginForm
							message={props.message}
							setMessage={props.setMessage}
							login={props.handleLogin}
						/>
					</Row>
					<Row>
						<p style={{textAlign: "center", marginTop:5} }>Not a member? 
							<u><a onClick={handleRegistration}>Register</a></u>
						</p>
					</Row>
				</Col >
				<Col xs={3} />
			</Row>
		</Container>
	);
};
