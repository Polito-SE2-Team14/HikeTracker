import { useEffect, useState } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import UserAPI from "../api/UserAPI";
import { Loading } from "../components/Loading";

export function UserVerificationPage(props) {
	let navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const { token } = useParams();

	useEffect(() => {
		setLoading(true);
		const verifyUser = async (token) => {
			try {
				await UserAPI.verifyUser(token);
				setLoading(false);
				props.setIsVerified(true);
				setTimeout(() => {
					navigate('/login')
				}, 5000)
			} catch (error) {
				setHasError(true);
				setLoading(false);
				console.log(error);
			}
		};
		verifyUser(token);
	}, []);

	return (
		<Container>
			{loading ? <Loading /> :
				<Row className="d-flex justify-content-center text-center mt-5">
					{hasError ?
						<Alert key='danger' variant='danger'>
							An Error happened. Your link is not correct!
						</Alert>
						:
						<Alert key='success' variant='success'>
							You are successfully verified. You will automatically redirect to login page.
						</Alert>
					}
				</Row>
			}
		</Container>
	);
}
