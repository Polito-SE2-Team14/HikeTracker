import { useEffect, useState } from "react";
import { Col, Container, Row, Button, Modal, Form } from "react-bootstrap";

import { Loading } from "../components/Loading";
import { HutListTable } from "../components/HutList/HutListTable";

import PointAPI from "../api/PointAPI";
import { HutCreationModal } from "../components/HutList/HutCreationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { AreaSelectMap } from "../components/Map/Maps";

export function HutsPage(props) {
	const [loading, setLoading] = useState(true);

	const [huts, setHuts] = useState([]);
	const [filteredHuts, setFilteredHuts] = useState([]);

	const [showFilterModal, setShowFilterModal] = useState(false);
	const [filters, setFilters] = useState({
		name: "",
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

	//TODO(antonio): move to another file and expand
	function applyFilters(huts, filters) {
		return huts.filter((h) => h.name.startsWith(filters.name));
	}

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

function HutFilterModal(props) {
	const [showLocationForm, setShowLocationForm] = useState(false);
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [showBedspaceForm, setShowBedspaceForm] = useState(false);

	const [area, setArea] = useState({});
	const [address, setAddress] = useState("");
	const [minBedspace, setMinBedspace] = useState(0);

	const onApply = (ev) => {
		ev.preventDefault();

		let newData = {};

		// TODO(antonio): add validation

		if (showLocationForm) {
			newData.area = area;
		}
		if (showAddressForm) {
			newData.address = address.trim();
		}
		if (showBedspaceForm) {
			newData.minBedspace = minBedspace;
		}

		props.setFilters({ ...props.filters, ...newData });
		props.onHide();
	};

	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Form>
				<Modal.Header closeButton>
					<Modal.Title>Select filters</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<span className="d-flex">
						<Form.Check
							type="switch"
							checked={showLocationForm}
							onChange={(e) => setShowLocationForm(e.target.checked)}
						/>
						<Form.Label>Area filter</Form.Label>
					</span>
					{showLocationForm ? (
						<AreaSelectMap
							onSetArea={(area) => {
								setArea(area);
							}}
						/>
					) : (
						false
					)}
					<span className="d-flex">
						<Form.Check
							type="switch"
							checked={showAddressForm}
							onChange={(e) => setShowAddressForm(e.target.checked)}
						/>
						<Form.Label>Address filter</Form.Label>
					</span>
					{showAddressForm ? (
						<Form.Control
							placeholder="Insert address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					) : (
						false
					)}
					<span className="d-flex">
						<Form.Check
							type="switch"
							checked={showBedspaceForm}
							onChange={(e) => setShowBedspaceForm(e.target.checked)}
						/>
						<Form.Label>Bedspace filter</Form.Label>
					</span>
					{showBedspaceForm ? <Form.Control
						type="number"
						placeholder="Insert bedspace"
						value={minBedspace}
						onChange={e => setMinBedspace(e.target.value)}
					/> : false}
				</Modal.Body>
				<Modal.Footer>
					<Button className="me-1" variant="secondary" onClick={props.onHide}>
						Close
					</Button>
					<Button type="submit" className="me-1" onClick={onApply}>
						Apply
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
}
