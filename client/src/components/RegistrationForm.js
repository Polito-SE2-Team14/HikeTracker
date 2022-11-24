import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export function RegistrationForm(props) {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPwd, setRepeatPwd] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [type, setType] = useState('');

	const handleSubmit = (event) => {
		let credentials = { name, surname, email, phoneNumber, type, password };
		let invalids = [];

		event.preventDefault();

		props.setMessage('');

		let validateName = (text) => {
			return !String(text).match(/[^a-zA-Z]/i);
		};

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


		if (name === '' || !validateName(name)) {
			invalids.push(" name");
			setName('');
		}
		if (surname === '' || !validateName(surname)) {
			invalids.push(" surname");
			setSurname('');
		}
		if (email === '' || !validateEmail(email)) {
			invalids.push(" username");
			setEmail('');
		}
		if (phoneNumber === '' || !validatePhone(phoneNumber)) {
			invalids.push(" phone");
			setPhoneNumber('');
		}
		if (password === '' || password !== repeatPwd) {
			invalids.push(" password");
		}

		if (invalids.length !== 0 || !props.register(credentials)){
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
						{props.message && <Alert variant='danger' onClose={() => props.setMessage('')} dismissible>{props.message}</Alert>}
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
							<Form.Control type='email' value={email} onChange={ev => setEmail(ev.target.value)} />
						</Form.Group>
						<Form.Group controlId='phoneNumber'>
							<Form.Label>Phone</Form.Label>
							<Form.Control type='text' value={phoneNumber} onChange={ev => setPhoneNumber(ev.target.value)} />
						</Form.Group>
						<Form.Group>
							<Form.Label>User Type</Form.Label>
							<Form.Check type='radio' name='type' label='Hiker' value='hiker' onClick={ev => setType(ev.target.value)} />
							<Form.Check type='radio' name='type' label='Local Guide' value='localGuide' onClick={ev => setType(ev.target.value)} />
							<Form.Check type='radio' name='type' label='Hut Worker' value='hutWorker' onClick={ev => setType(ev.target.value)} />
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
						</Form.Group>
						<Form.Group controlId='repeatPwd'>
							<Form.Label>Repeat password</Form.Label>
							<Form.Control type='password' value={repeatPwd} onChange={ev => setRepeatPwd(ev.target.value)} />
						</Form.Group>
						<Button style={{ marginTop: 20 }} type="submit" onClick={handleSubmit}>Register</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}