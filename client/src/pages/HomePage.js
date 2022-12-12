import { Navigate } from "react-router-dom";

export function HomePage(props) {
	return (
		<>
			{props.loggedIn ?
				!props.verified ? <Navigate replace to='/not-verified' /> :
					!props.approved && props.user.type !== 'hiker' && <Navigate replace to='/not-approved' /> :
				<Navigate to="/hikes" />
			}
		</>
	);
}
