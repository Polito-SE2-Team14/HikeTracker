import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 
 * @param {function} props.setMessage - function to show an error message
 * @param {string}	 props.message - string telling if the user has filled the form incorrectly
 * @param {function} props.login - function to log in
 * @returns a form to make the user log in
 */
function LoginForm(props) {
	let navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event) => {

		event.preventDefault();
		props.setMessage('');
		const credentials = { username, password };

		let invalids = [];
		if (username === '') {
			invalids.push(" username");
		}
		if (password === '') {
			invalids.push(" password");
		}
		if (invalids.length === 0) {
			const value = await props.login(credentials);
			console.log("value", value)
			if (value === true)
				navigate("/");
		} else {
			props.setMessage(`Invalid${invalids.toString()}`);
		}
	};


	return (
		<Container>
			<Row>
				<Col>
					<Form>
						{props.message ? <Alert variant='danger' onClose={() => props.setMessage('')} dismissible>{props.message}</Alert> : ''}
						<Form.Group controlId='username'>
							<Form.Label>E-mail</Form.Label>
							<Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} />
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
						</Form.Group>
						<Row>
							<Button style={{ marginTop: 20 }} type="submit" onClick={handleSubmit}>Login</Button>
						</Row>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

/**
 * @param {user} props.user - the current user
 * @param {function} props.logout - function to log out
 * @returns a button enabling a logged user to log out
 */
function LogoutButton(props) {
	return (
		<Col>
			<span>User: {props.user?.name}</span>{' '}<Button variant="outline-primary" onClick={props.logout}>Logout</Button>
		</Col>
	)
}


export { LoginForm, LogoutButton };