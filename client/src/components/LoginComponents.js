import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

function LoginForm(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (event) => {

		const validateEmail = (email) => {
			return String(email)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
		};

		event.preventDefault();
		props.setMessage('');
		const credentials = { username, password };

		let invalids = [];
		if (username === '' || !validateEmail(username)) {
			invalids.push(" username");
		}
		if (password === '') {
			invalids.push(" password");
		}
		if (invalids.length === 0) {
			props.login(credentials);
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
						<Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)}/>
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
					</Form.Group>
					<Button type="submit" onClick={handleSubmit}>Login</Button>
				</Form>
			</Col>
		</Row>
	</Container>
  )
}

function LogoutButton(props) {
	return (
	  <Col>
		<span>User: {props.user?.name}</span>{' '}<Button variant="outline-primary" onClick={props.logout}>Logout</Button>
	  </Col>
	)
  }


export { LoginForm, LogoutButton };