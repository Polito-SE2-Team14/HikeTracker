import { useEffect, useState } from "react";
import {
	Col,
	Container,
	Row,
	Button,
} from "react-bootstrap";

import { Loading } from "../components/Loading";
import { HutListTable } from "../components/HutList/HutListTable";

import PointAPI from "../api/PointAPI";
import { HutCreationModal } from "../components/HutList/HutCreationModal";

export function HutsPage(props) {
	const [loading, setLoading] = useState(true);

	const [huts, setHuts] = useState([]);

	const [modalVisible, setModalVisible] = useState(false);

	const [modalFooterVisible, setModalFooterVisible] = useState(false);

	const handleSubmit = () => {
		setModalVisible(true);
	};

	const handleClose = () => {
		setModalVisible(false);
	};

	const handleCreate = (name, latitude, longitude, address, bedspace, hutOwnerID) => {
		let hut = {
			name: name,
			latitude: Number(latitude),
			longitude: Number(longitude),
			address: address,
			bedspace: Number(bedspace),
			hutOwnerID: Number(hutOwnerID)
		}
		PointAPI.createHut(hut)
			.then(() => {
				setHuts([...huts, hut])
				setModalVisible(false);
			})
			.catch(err => {
				console.error(err);
				setModalFooterVisible(true);
				setTimeout(() => setModalFooterVisible(false), 3000);
			})

	};

	const getAllHuts = async () => {
		try {
			let huts = await PointAPI.getAllHuts();

			/* const huts = [
				{
					name: "hut1",
					latitude: 45.177786,
					longitude: 7.083372,
					address: "via da me",
					pointType: "hut",
					bedspace: 32,
				},
				{
					name: "hut2",
					latitude: 41.13,
					longitude: 13.32,
					address: "parco bio",
					pointType: "hut",
					bedspace: 10,
				},
			]; // TEST */
			setHuts(huts);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllHuts();
	}, [huts.length]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container>
					<Row className="mt-3">
						<Col>filter button</Col>
						<Col className="text-end">
							<Button onClick={() => handleSubmit()}>ADD</Button>
							<HutCreationModal
								footerVisible={modalFooterVisible}
								show={modalVisible}
								onHide={handleClose}
								handleCreate={handleCreate}
							/>
						</Col>
					</Row>
					{/*filter modal?*/}

					<HutCreationModal show={modalVisible} onHide={handleClose} handleCreate={handleCreate} />

					<HutListTable huts={huts} setHuts={setHuts} user={props.user} />
				</Container>
			)}
		</>
	);
}


