import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { AreaSelectMap } from "../../components/Map/Maps";

export function HutFilterModal(props) {
	const [showProvinceForm, setShowProvinceForm] = useState(false);
	const [showLocationForm, setShowLocationForm] = useState(false);
	const [showAddressForm, setShowAddressForm] = useState(false);
	const [showBedspaceForm, setShowBedspaceForm] = useState(false);

	const [province, setProvince] = useState("");
	const [municipality, setMunicipality] = useState("");
	const [area, setArea] = useState({});
	const [address, setAddress] = useState("");
	const [minBedspace, setMinBedspace] = useState(0);

	const onApply = function(ev){
		ev.preventDefault();

		// TODO(antonio): add validation
		props.setFilters({
			...props.filters,
			province: showProvinceForm ? province : "",
			municipality: showProvinceForm ? municipality : "",
			area: showLocationForm ? area : {},
			address: showAddressForm ? address : "",
			bedspace: showBedspaceForm ? minBedspace : 0,
		});
		props.onHide();
	};

	let selectShowProvinceForm = function(e){setShowProvinceForm(e.target.checked)}
	let selectProvince = function(e){setProvince(e.target.value)}
	let selectMunicipality = function(e){setMunicipality(e.target.value)}
	let selectShowLocationForm = function(e){setShowLocationForm(e.target.checked)}
	let selectShowAddressForm = function(e){setShowAddressForm(e.target.checked)}
	let selectAddress = function(e){setAddress(e.target.value)}
	let selectShowBedspaceForm = function(e){setShowBedspaceForm(e.target.checked)}
	let selectMinBedspace = function(e){setMinBedspace(e.target.value)}
	let selectArea = function(area){setArea(area)}

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
							checked={showProvinceForm}
							onChange={selectShowProvinceForm}
						/>
						<Form.Label>Province filter</Form.Label>
					</span>
					{showProvinceForm ? (
						<>
							<Form.Label>Province</Form.Label>
							<Form.Control
								placeholder="Insert province"
								value={province}
								onChange={selectProvince}
							/>
							<br/>
							<Form.Label>Municipality</Form.Label>
							<Form.Control
								placeholder="Insert municipality"
								value={municipality}
								onChange={selectMunicipality}
							/>
							<br/>
						</>
					) : (
						false
					)}
					<span className="d-flex">
						<Form.Check
							type="switch"
							checked={showLocationForm}
							onChange={selectShowLocationForm}
						/>
						<Form.Label>Area filter</Form.Label>
					</span>
					{showLocationForm ? (
						<AreaSelectMap
							onSetArea={selectArea}
						/>
					) : (
						false
					)}
					<span className="d-flex">
						<Form.Check
							type="switch"
							checked={showAddressForm}
							onChange={selectShowAddressForm}
						/>
						<Form.Label>Address filter</Form.Label>
					</span>
					{showAddressForm ? (
						<Form.Control
							placeholder="Insert address"
							value={address}
							onChange={selectAddress}
						/>
					) : (
						false
					)}
					<span className="d-flex">
						<Form.Check
							type="switch"
							checked={showBedspaceForm}
							onChange={selectShowBedspaceForm}
						/>
						<Form.Label>Bedspace filter</Form.Label>
					</span>
					{showBedspaceForm ? (
						<>
							<Form.Control
								type="number"
								placeholder="Insert bedspace"
								value={minBedspace}
								onChange={selectMinBedspace}
							/>
							<Form.Text>Minimum bedspace available</Form.Text>
						</>
					) : (
						false
					)}
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
