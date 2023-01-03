import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Loading } from "../components/Loading";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserAPI from "../api/UserAPI";
import { UserTable } from "../components/UserList/UserTable";

export function AdminPage() {
	const [loading, setLoading] = useState(true);
	const [tabKey, setTabKey] = useState('hut-worker');
	const [hutWorkers, setHutWorkers] = useState([]);
	const [localGuides, setLocalGuides] = useState([]);

	const getAllHutWorkers = async function (){
		let users;
		await UserAPI.getAllHutWorkers()
			.then(u => {
				users = u
				setHutWorkers(users);
				setLoading(false);
			})
			.catch((error) => { console.log(error); })
	};

	const getAllLocalGuides = async function (){
		let users;
		await UserAPI.getAllLocalGuides()
			.then(u => {
				users = u
				setLocalGuides(users);
				setLoading(false);
			})
			.catch((error) => { console.log(error); })
	};

	useEffect(() => {
		getAllHutWorkers();
	}, [hutWorkers.length]);

	useEffect(() => {
		getAllLocalGuides();
	}, [localGuides.length]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container>
					<h1 className="mt-3 text-center">Admin Page</h1>
					<Tabs
						id="controlled-tab-example"
						activeKey={tabKey}
						onSelect={function(k){setTabKey(k)}}
						className="mb-3"
					>
						<Tab eventKey="hut-worker" title="HutWorkers">
							<UserTable users={hutWorkers} getAllUsers={getAllHutWorkers} />
						</Tab>
						<Tab eventKey="local-guide" title="LocalGuides">
							<UserTable users={localGuides} getAllUsers={getAllLocalGuides} />
						</Tab>
					</Tabs>
				</Container>
			)}
		</>
	);
}
