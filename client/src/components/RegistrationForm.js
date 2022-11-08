import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export function RegistrationForm(props) {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPwd, setRepeatPwd] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [type, setType] = useState('');

	const handleSubmit = (event) => {
		let credentials = { name, surname, username, phoneNumber, type, password };
		let invalids = [];

		event.preventDefault();

		props.setMessage('');

		let validateName = (text) => {
			return !String(text).match(/[^a-z]/i);
		}

		let validateEmail = (email) => {
			return String(email)
				.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
		};

		let validatePhone = (phone) => {
			return !String(phone).match(/[^0-9]/i);
		};


		if (username === '' || !validateName(username)) {
			invalids.push(" name");
			setName('');
		}
		if (username === '' || !validateName(username)) {
			invalids.push(" surname");
			setSurname('');
		}
		if (username === '' || !validateEmail(username)) {
			invalids.push(" username");
			setUsername('');
		}
		if (phoneNumber === '' || !validatePhone(phoneNumber)) {
			invalids.push(" phone");
			setPhoneNumber('');
		}
		if (password === '' || password !== repeatPwd) {
			invalids.push(" password");
		}

		if (invalids.length === 0) {
			props.register(credentials);
		} else {
			props.setMessage(`Invalid${invalids.toString()}`);
			setPassword('');
			setRepeatPwd('');
		}
	};

	return (
		<Container>
			<Row>
				<Col>
					<Form>
						{props.message ? <Alert variant='danger' onClose={() => props.setMessage('')} dismissible>{props.message}</Alert> : ''}
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control type='text' value={name} onChange={ev => setName(ev.target.value)} />
						</Form.Group>
						<Form.Group controlId='surname'>
							<Form.Label>Surname</Form.Label>
							<Form.Control type='text' value={surname} onChange={ev => setSurname(ev.target.value)} />
						</Form.Group>
						<Form.Group controlId='username'>
							<Form.Label>E-mail</Form.Label>
							<Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} />
						</Form.Group>
						<Form.Group controlId='phoneNumber'>
							<Form.Label>Phone</Form.Label>
							<Form.Control type='text' value={phoneNumber} onChange={ev => setPhoneNumber(ev.target.value)} />
						</Form.Group>
						<Form.Group controlId='type'>
							<Form.Label>User Type</Form.Label>
							<Form.Check type='radio' name='type' label='Hiker' value='hiker' onClick={ev => setType(ev.target.value)} />
							<Form.Check type='radio' name='type' label='Friend' value='friend' onClick={ev => setType(ev.target.value)} />
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
						</Form.Group>
						<Form.Group controlId='repeatPwd'>
							<Form.Label>Repeat password</Form.Label>
							<Form.Control type='password' value={''} onChange={ev => setRepeatPwd(ev.target.value)} />
						</Form.Group>
						<Button type="submit" onClick={handleSubmit}>Register</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}