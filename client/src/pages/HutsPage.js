import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form, Modal } from "react-bootstrap";

import { Loading } from "../components/Loading";
import { HutListTable } from "../components/HutList/HutListTable";

import PointAPI from "../api/PointAPI";
import { isInArea } from "../components/HikeData";

import { HutCreationModal } from "../components/HutList/HutCreationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import RoleManagement from "../class/RoleManagement";
import { HutFilters } from "../components/HutList/HutFilters";

export function HutsPage(props) {
	const [loading, setLoading] = useState(true);

	const [huts, setHuts] = useState([]);
	const [filteredHuts, setFilteredHuts] = useState([]);

	const [showFilterForm, setShowFilterForm] = useState(false);
	const [filters, setFilters] = useState({
		name: "",
		area: null,
		address: "",
		province: "",
		municipality: "",
		country: "",
		bedspace: [],
	});

	const [modalVisible, setModalVisible] = useState(false);

	const [modalFooterVisible, setModalFooterVisible] = useState(false);

	const handleShowFilterModal = function () {
		setShowFilterForm(true);
	};

	let handleCloseFilterModal = function () {
		setShowFilterForm(false);
	};

	let handleSubmit = function () {
		setModalVisible(true);
	};

	const handleClose = function () {
		setModalVisible(false);
	};

	const handleCreate = async function (givenHut) {
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
			email: givenHut.email,
		};

		hut.pointID = await PointAPI.createHut(hut)
			.then((res) => {

				setHuts(old => [...old, hut]);
				setModalFooterVisible(false);
				setModalVisible(false);

				return res.pointID;
			})
			.catch((err) => {
				console.error(err);
				setModalFooterVisible(err);
				setTimeout(() => setModalFooterVisible(false), 3000);
			});

		return hut.pointID;
	};

	const getAllHuts = async function () {
		await PointAPI.getAllHuts()
			.catch((err) => {
				console.error(err);
			})
			.then((huts) => {
				setHuts(huts);
				setFilteredHuts(applyFilters(huts, filters));

				setLoading(false);
			});
	};

	useEffect(() => {
		setFilteredHuts(applyFilters(huts, filters));
		// eslint-disable-next-line
	}, [filters]);

	useEffect(() => {
		getAllHuts();
		// eslint-disable-next-line
	}, [huts.length]);

	const insertButton = (
		<Button variant="success" onClick={handleSubmit}>
			<FontAwesomeIcon icon={faPlus} /> Register Hut
		</Button>
	);

	let selectFilters = function (ev) { setFilters({ ...filters, name: ev.target.value.trim() }) }
	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container className="mb-4">
					<h1 className="mt-3 text-center">Huts</h1>
					<Row className="mt-3 d-xl-none">
						<Col>
							<Form className="d-flex">
								<Form.Control
									type="search"
									placeholder="Search"
									value={filters.name}
									onChange={selectFilters}
								/>
								<Button onClick={handleShowFilterModal}>
									<FontAwesomeIcon icon={faFilter} />
								</Button>
							</Form>
						</Col>

						{RoleManagement.isLocalGuide(props.user) ? (
							<Col xs={5} className="text-end">
								{insertButton}
							</Col>
						) : (
							false
						)}
					</Row>

					<Modal show={showFilterForm} onHide={handleCloseFilterModal}>
						<Modal.Header closeButton>
							<Modal.Title>Filter</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<HutFilters huts={huts} filters={filters} setFilters={setFilters} />
						</Modal.Body>
						<Modal.Footer>
							<Button variant="secondary" onClick={handleCloseFilterModal}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>

					<HutCreationModal
						footerVisible={modalFooterVisible}
						show={modalVisible}
						onHide={handleClose}
						handleCreate={handleCreate}
					/>

					<HutListTable
						huts={huts}
						shownHuts={filteredHuts}
						setHuts={setHuts}
						user={props.user}
						filters={filters}
						setFilters={setFilters}
						insertButton={insertButton}
					/>
				</Container>
			)}
		</>
	);
}

function applyFilters(huts, filters) {
	const checkBedspace = (hut) => {
		if (filters.bedspace.length === 0) return true;

		return (
			hut.bedspace >= filters.bedspace[0] && hut.bedspace <= filters.bedspace[1]
		);
	};

	const checkArea = (hut) => {
		if (!filters.area) {
			return true;
		}

		return isInArea(hut, filters.area);
	};

	return huts.filter(
		(h) =>
			h.name.toLowerCase().startsWith(filters.name.toLowerCase()) &&
			h.country.toLowerCase().startsWith(filters.country.toLowerCase()) &&
			h.province.toLowerCase().startsWith(filters.province.toLowerCase()) &&
			h.municipality.toLowerCase().startsWith(filters.municipality.toLowerCase()) &&
			checkArea(h) &&
			h.address.toLowerCase().includes(filters.address.toLowerCase()) &&
			checkBedspace(h)
	);
}
