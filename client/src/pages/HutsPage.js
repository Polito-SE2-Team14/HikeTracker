import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";

import { Loading } from "../components/Loading";
import { HutListTable } from "../components/HutList/HutListTable";

import PointAPI from "../api/PointAPI";
import { isInArea } from "../components/HikeData";

import { HutCreationModal } from "../components/HutList/HutCreationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { HutFilterModal } from "../components/HutList/HutFilterModal";

export function HutsPage(props) {
	const [loading, setLoading] = useState(true);

	const [huts, setHuts] = useState([]);
	const [filteredHuts, setFilteredHuts] = useState([]);

	const [showFilterModal, setShowFilterModal] = useState(false);
	const [filters, setFilters] = useState({
		name: "",
		area: {},
		address: "",
		province: "",
		municipality: "",
		bedspace: 0,
	});

	const [modalVisible, setModalVisible] = useState(false);

	const [modalFooterVisible, setModalFooterVisible] = useState(false);

	const handleShowFilterModal = () => {
		setShowFilterModal(true);
	};

	const handleCloseFilterModal = () => {
		setShowFilterModal(false);
	};

	const handleSubmit = () => {
		setModalVisible(true);
	};

	const handleClose = () => {
		setModalVisible(false);
	};

	const handleCreate = (givenHut) => {

		let hut = {
			name: givenHut.name,
			description: givenHut.description,
			latitude: Number(givenHut.latitude),
			longitude: Number(givenHut.longitude),
			altitude: Number(givenHut.altitude),
			address: givenHut.address,
			country: givenHut.country,
			province: givenHut.province,
			municipality: givenHut.municipality,
			bedspace: Number(givenHut.bedspace),
			creatorID: props.user.userID,
			website: givenHut.website,
			phoneNumber: givenHut.phoneNumber,
			email: givenHut.email
		};


		PointAPI.createHut(hut)
			.then(() => {
				setHuts([...huts, hut]);
				setModalFooterVisible(false);
				setModalVisible(false);
			})
			.catch((err) => {
				console.error(err);
				setModalFooterVisible(err);
				setTimeout(() => setModalFooterVisible(false), 3000);
			});
	};

	const getAllHuts = async () => {

		let huts
		await PointAPI.getAllHuts()
			.catch(err => { console.error(err) })
			.then(h => {
				huts = h
				setHuts(huts);
				setFilteredHuts(applyFilters(huts, filters));

				setLoading(false);
			})

	};

	useEffect(() => {
		setFilteredHuts(applyFilters(huts, filters));
		// eslint-disable-next-line
	}, [filters]);

	useEffect(() => {
		getAllHuts();
		// eslint-disable-next-line
	}, [huts.length]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container>
					<h1 className="mt-3">Huts</h1>
					<Row className="mt-3">
						<Col>
							<Form className="d-flex">
								<Form.Control
									type="search"
									placeholder="Search"
									value={filters.name}
									onChange={(ev) =>
										setFilters({ ...filters, name: ev.target.value.trim() })
									}
								/>
								<Button onClick={handleShowFilterModal}>
									<FontAwesomeIcon icon={faFilter} />
								</Button>
							</Form>
						</Col>

						{
							props.user && props.user.type === "localGuide" ?
								<Col xs={5} className="text-end">
									<Button variant="success" onClick={() => handleSubmit()}>
										<FontAwesomeIcon icon={faPlus} /> Register Hut
									</Button>
								</Col>
								:
								false}
					</Row>
					<HutFilterModal
						show={showFilterModal}
						onHide={handleCloseFilterModal}
						filters={filters}
						setFilters={setFilters}
					/>

					<HutCreationModal
						footerVisible={modalFooterVisible}
						show={modalVisible}
						onHide={handleClose}
						handleCreate={handleCreate}
					/>

					<HutListTable
						huts={filteredHuts}
						setHuts={setHuts}
						user={props.user}
					/>
				</Container>
			)}
		</>
	);
}

function applyFilters(huts, filters) {
	return huts.filter(
		(h) =>
			h.name.startsWith(filters.name) &&
			h.province.startsWith(filters.province) &&
			h.municipality.startsWith(filters.municipality) &&
			isInArea(h, filters.area) &&
			h.address.includes(filters.address) &&
			h.bedspace >= filters.bedspace
	);
}
