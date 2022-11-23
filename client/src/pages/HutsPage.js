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

	const handleCreate = (
		name,
		latitude,
		longitude,
		address,
		bedspace,
		hutOwnerID
	) => {
		console.log(name, latitude, longitude, address, bedspace, hutOwnerID);

		let hut = {
			name: name,
			latitude: Number(latitude),
			longitude: Number(longitude),
			address: address,
			bedspace: Number(bedspace),
			hutOwnerID: Number(hutOwnerID),
		};

		let invalids = [];

		if (name == null || name === "" || !String(name).match(/[a-zA-Z]+/i))
			invalids.push(" name");

		if (latitude == null || latitude === "" || Number.isNaN(latitude))
			invalids.push(" latitude");

		if (longitude == null || latitude === "" || Number.isNaN(longitude))
			invalids.push(" longitude");

		if (address == null || address === "") invalids.push(" address");

		if (bedspace == null || bedspace === "" || Number.isNaN(bedspace))
			invalids.push(" bedspace");

		if (hutOwnerID == null || hutOwnerID === "" || Number.isNaN(hutOwnerID))
			invalids.push(" hutOwnerID");

		console.log(invalids.length);

		if (invalids.length === 0) {
			PointAPI.createHut(hut)
				.then(() => {
					setHuts([...huts, hut]);
					setModalFooterVisible(false);
					setModalVisible(false);
				})
				.catch((err) => {
					console.error(err);
					setModalFooterVisible(true);
					setTimeout(() => setModalFooterVisible(false), 3000);
				});
		} else {
			setModalFooterVisible("Errors with" + invalids.join(","));
		}
	};

	const getAllHuts = async () => {
		try {
			let huts = await PointAPI.getAllHuts();
			setHuts(huts);
			setFilteredHuts(applyFilters(huts, filters));

			setLoading(false);
		} catch (err) {
			console.log(err);
		}
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
						<Col xs={5} className="text-end">
							<Button variant="success" onClick={() => handleSubmit()}>
								<FontAwesomeIcon icon={faPlus} /> Register Hut
							</Button>
						</Col>
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
			isInArea(h, filters.area) &&
			h.address.includes(filters.address) &&
			h.bedspace >= filters.bedspace
	);
}
