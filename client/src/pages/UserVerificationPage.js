import { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
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
			} catch (error) {
				setHasError(true);
				setLoading(false);
				console.log(error);
			}
		};
		verifyUser(token);
	}, []);

	let handleLogout = () => {
		props.logout();
		navigate("/");
	};

	return (
		<Container>
			<Loading/>
			<Row className="d-flex justify-content-center text-center mt-5">

			</Row>
		</Container>
	);
}
