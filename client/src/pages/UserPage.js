import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function UserPage(props) {
	let navigate = useNavigate();

	let handleLogout = () => {
		props.setLoggedIn(false);
		props.setUser({});
		navigate("/");
	};

	return (
		<>
			User page
			<Button onClick={handleLogout}>[TEST] Logout</Button>
		</>
	);
}
