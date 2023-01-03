import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export function RegistrationForm(props) {
	const [name, setName] = useState('');
	const [surname, setSurname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPwd, setRepeatPwd] = useState('');
	const [phoneNumber, setPhoneNumber] = useState(0);
	const [type, setType] = useState('');

	const handleSubmit = (event) => {
		let credentials = { name, surname, email, phoneNumber, type, password };
		let invalids = [];

		event.preventDefault();

		props.setMessage('');

		let validateName = (text) => {
			return !String(text).match(/[^a-zA-Z]/i);
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
		if (email === '' ) {
			invalids.push(" username");
			setEmail('');
		}
		if (phoneNumber === 0 || !validatePhone(phoneNumber)) {
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

	let emptyMessage=function(){props.setMessage('')}

	let selectName = function(ev){setName(ev.target.value)}
	let selectSurname = function(ev){setSurname(ev.target.value)}
	let selectEmail = function(ev){setEmail(ev.target.value)}
	let selectPhoneNumber = function(ev){setPhoneNumber(parseInt(ev.target.value))}
	let selectType=function(ev){setType(ev.target.value)}
	let selectPassword = function(ev){setPassword(ev.target.value)}
	let selectRepeatPwd = function(ev){setRepeatPwd(ev.target.value)}


	return (
		<Container>
			<Row>
				<Col>
					<Form>
						{props.message && <Alert variant='danger' onClose={emptyMessage} dismissible>{props.message}</Alert>}
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control type='text' value={name} onChange={selectName} />
						</Form.Group>
						<Form.Group controlId='surname'>
							<Form.Label>Surname</Form.Label>
							<Form.Control type='text' value={surname} onChange={selectSurname} />
						</Form.Group>
						<Form.Group controlId='username'>
							<Form.Label>E-mail</Form.Label>
							<Form.Control type='email' value={email} onChange={selectEmail} />
						</Form.Group>
						<Form.Group controlId='phoneNumber'>
							<Form.Label>Phone</Form.Label>
							<Form.Control type='number' value={phoneNumber} onChange={selectPhoneNumber} />
						</Form.Group>
						<Form.Group>
							<Form.Label>User Type</Form.Label>
							<Form.Check type='radio' name='type' label='Hiker' value='hiker' onClick={selectType} />
							<Form.Check type='radio' name='type' label='Local Guide' value='localGuide' onClick={selectType} />
							<Form.Check type='radio' name='type' label='Hut Worker' value='hutWorker' onClick={selectType} />
						</Form.Group>
						<Form.Group controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' value={password} onChange={selectPassword} />
						</Form.Group>
						<Form.Group controlId='repeatPwd'>
							<Form.Label>Repeat password</Form.Label>
							<Form.Control type='password' value={repeatPwd} onChange={selectRepeatPwd} />
						</Form.Group>
						<Button style={{ marginTop: 20 }} type="submit" onClick={handleSubmit}>Register</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}