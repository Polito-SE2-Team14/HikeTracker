import { useState } from "react";
import { Alert, Button, Container, Row } from "react-bootstrap";
import UserAPI from "../api/UserAPI";
import { Loading } from "../components/Loading";

export function UserNotVerifiedPage(props) {

	const [loading, setLoading] = useState(false);
	const [emailIsSent, setEmailIsSent] = useState(false);

	let handleSendEmail = async () => {
		try {
			setLoading(true);
			await UserAPI.sendVerificationEmail(props.user.token)
			setEmailIsSent(true);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setEmailIsSent(false);
			setLoading(false);
		}
	};

	return (
		<Container>
			{loading ? <Loading /> :
				<Row className="d-flex justify-content-center text-center mt-5">
					{emailIsSent ?
						<Alert key='primary' variant='primary'>
							The verification link has been sent to your email
						</Alert>
						:
						<div>
							<Alert key='danger' variant='danger'>
								You are not verified. If you did not receive a verification email use the button below.
							</Alert>
							<Button variant="primary" onClick={handleSendEmail}>Resend Verification Email</Button>
						</div>
					}
				</Row>
			}
		</Container>
	);
}
